import { Inject, Injectable, Logger } from '@nestjs/common';
import { Octokit } from 'octokit';
// import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GithubService {
  octokit: any;
  private readonly logger = new Logger(GithubService.name);
  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_SYNC_TOKEN, // 使用你的GitHub个人访问令牌
    });
  }
  @Inject(PrismaService)
  private prisma: PrismaService;

  // 定时任务
  // @Cron(CronExpression.EVERY_10_SECONDS)
  // day() {
  //   this.logger.debug('Called every 30 seconds');
  // }

  // 需要记录一下时间
  async syncDayDayUpIssues() {
    const res = await this.octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner: 'mortal-cultivation-biography',
      repo: 'daydayup',
    });
    const { data = [] } = res;
    const result = data?.map((item) => {
      const { url, id, title, updated_at } = item;

      return {
        url,
        githubIssueId: id,
        title,
        updateTime: updated_at,
      };
    });
    const oldData = await this.getDayDayUp();
    const newData = result.filter(
      (item) =>
        !oldData.some(
          (oldItem) => oldItem.githubIssueId === item.githubIssueId,
        ),
    );
    await this.prisma.dayDayUp.createMany({
      data: newData,
    });
  }

  async syncAwesomeIssues() {
    const res = await this.octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner: 'mortal-cultivation-biography',
      repo: 'awesome',
    });
    const { data = [] } = res;
    const result = data?.map((item) => {
      const { url, id, title, updated_at } = item;

      return {
        url,
        githubIssueId: id,
        title,
        updateTime: updated_at,
      };
    });
    const oldData = await this.getDayDayUp();
    const newData = result.filter(
      (item) =>
        !oldData.some(
          (oldItem) => oldItem.githubIssueId === item.githubIssueId,
        ),
    );
    await this.prisma.dayDayUp.createMany({
      data: newData,
    });
  }

  async getDayDayUp() {
    return await this.prisma.dayDayUp.findMany();
  }

  async getAwesome() {
    return await this.prisma.awesome.findMany();
  }
}
