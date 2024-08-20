import { Injectable, Logger } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
import { Octokit } from 'octokit';
// import { CreateGithubDto } from './dto/create-github.dto';
// import { UpdateGithubDto } from './dto/update-github.dto';

@Injectable()
export class GithubService {
  octokit: any;
  private readonly logger = new Logger(GithubService.name);
  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_SYNC_TOKEN, // 使用你的GitHub个人访问令牌
    });
  }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  // day() {
  //   console.log(123);
  //   this.logger.debug('Called every 30 seconds');
  // }

  async getDayDayUpIssues() {
    const res = await this.octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner: 'mortal-cultivation-biography',
      repo: 'daydayup',
    });
    const { data = [] } = res;
    const result = data?.map((item) => {
      const { url, labels, id, title, updated_at } = item;
      const _labels = labels.map((label) => {
        const { id, name, color } = label;
        return {
          id,
          name,
          color,
        };
      });

      return {
        url,
        id,
        title,
        updated_at,
        // 这个是否要单独存储
        labels: _labels,
      };
    });
    return result;
  }
}
