import { Controller, Get } from '@nestjs/common';
import { GithubService } from './github.service';
// import { CreateGithubDto } from './dto/create-github.dto';
// import { UpdateGithubDto } from './dto/update-github.dto';
@Controller('github')
export class GithubController {
  octokit: any;
  constructor(private readonly githubService: GithubService) {}

  @Get('/daydayup')
  findAll() {
    return this.githubService.getDayDayUpIssues();
  }

  // @Get()
  // findAll() {
  //   return this.githubService.findAll();
  // }
}
