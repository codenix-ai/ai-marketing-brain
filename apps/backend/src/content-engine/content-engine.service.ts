import { Injectable, Logger } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';
import { PrismaService } from '../prisma/prisma.service';
import { BrandBrainService } from '../brand-brain/brand-brain.service';
import { GenerateContentDto } from './dto/generate-content.dto';

const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

@Injectable()
export class ContentEngineService {
  private readonly logger = new Logger(ContentEngineService.name);
  private readonly claude: Anthropic;

  constructor(
    private prisma: PrismaService,
    private brandBrainService: BrandBrainService,
  ) {
    this.claude = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async generate(dto: GenerateContentDto) {
    const brain = await this.brandBrainService.findBySlug(dto.brandSlug);
    const systemPrompt = this.brandBrainService.buildSystemPrompt(brain);

    const task = await this.prisma.marketingTask.findUniqueOrThrow({
      where: { slug: dto.taskSlug },
    });

    const userPrompt = this.interpolateTemplate(task.userPrompt, {
      ...dto.inputs,
      brandName: brain.name,
      audience: brain.targetAudience,
    });

    const startTime = Date.now();
    const response = await this.claude.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: task.maxTokens,
      temperature: task.temperature,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const content =
      response.content[0].type === 'text' ? response.content[0].text : '';
    const tokensUsed =
      response.usage.input_tokens + response.usage.output_tokens;

    this.logger.log(
      `Generated for ${dto.brandSlug}/${dto.taskSlug} — ${tokensUsed} tokens — ${Date.now() - startTime}ms`,
    );

    const saved = await this.prisma.generatedContent.create({
      data: {
        brandBrainId: brain.id,
        taskSlug: task.slug,
        taskLabel: task.label,
        userInputs: dto.inputs,
        content,
        tokensUsed,
        model: CLAUDE_MODEL,
      },
    });

    return {
      id: saved.id,
      content,
      tokensUsed,
      estimatedCost: this.estimateCost(tokensUsed),
    };
  }

  async generateBatch(jobs: GenerateContentDto[]) {
    const results = await Promise.allSettled(
      jobs.map((job) => this.generate(job)),
    );
    return results.map((r, i) => ({
      job: jobs[i],
      success: r.status === 'fulfilled',
      data: r.status === 'fulfilled' ? r.value : null,
      error:
        r.status === 'rejected'
          ? r.reason instanceof Error
            ? r.reason.message
            : String(r.reason)
          : null,
    }));
  }

  private interpolateTemplate(
    template: string,
    vars: Record<string, string>,
  ): string {
    return template.replace(
      /\{(\w+)\}/g,
      (_, key: string) => vars[key] || `{${key}}`,
    );
  }

  private estimateCost(tokens: number): string {
    // Claude Sonnet 4: ~$3 per 1M input + $15 per 1M output (approx mixed)
    const usd = (tokens / 1_000_000) * 9;
    return `$${usd.toFixed(4)} USD`;
  }
}
