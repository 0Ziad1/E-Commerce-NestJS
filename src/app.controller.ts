import { Body, Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("auth")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('login')
  login(@Res() res: any,@Body() body:any,@Req() req: any): string {
    const token= this.appService.login();
    console.log(body);
    console.log(req.body);
    
    return res.status(200).json({ 
    ...body,
     });
  }
}