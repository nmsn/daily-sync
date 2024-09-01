import { Controller, Get } from '@nestjs/common';
import { GithubService } from './github.service';
@Controller('github')
export class GithubController {
  octokit: any;
  constructor(private readonly githubService: GithubService) {}

  @Get('dayDayUp')
  async getDayDayUp() {
    return await this.githubService.getDayDayUp();
  }

  // put dayDayUp
  @Get('syncDayDayUp')
  async syncDayDayUp() {
    return await this.githubService.syncDayDayUpIssues();
  }

  @Get('awesome')
  async getAwesome() {
    return await this.githubService.getAwesome();
  }

  @Get('awesome')
  async syncAwesome() {
    return await this.githubService.syncAwesomeIssues();
  }
}
