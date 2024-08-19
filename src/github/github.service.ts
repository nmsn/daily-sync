import { Injectable } from '@nestjs/common';
import { Octokit } from 'octokit';
// import { CreateGithubDto } from './dto/create-github.dto';
// import { UpdateGithubDto } from './dto/update-github.dto';

@Injectable()
export class GithubService {
  octokit: any;
  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_SYNC_TOKEN, // 使用你的GitHub个人访问令牌
    });
  }

  async getDayDayUpIssues() {
    const data = await this.octokit.request(
      'GET /repos/{owner}/{repo}/issues',
      {
        owner: 'mortal-cultivation-biography',
        repo: 'daydayup',
      },
    );
    return data;
  }
}
