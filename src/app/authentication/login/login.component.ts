import { Component, OnInit } from '@angular/core';
import { SignInDto } from '../../integration/domain/auth/SignInDto';
import { AuthenticationService } from '../../integration/service/auth/authentication.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { promiseFromObservable } from '../../integration/utils/rest-utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  public signInDto: SignInDto;
  public loginErrorMessages = '';
  public loading: boolean = false;

  public constructor(
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.signInDto = { username: '', password: '' }
  }

  public async ngOnInit(): Promise<void> {
    const q = await promiseFromObservable(this.route.queryParams);
    if (q['afterSignUp'] != null) {
      this.messageService.add({
        severity: 'success',
        summary: 'Signed up successfully',
        detail: 'Please log in'
      });
    }
  }

  public async onSignInClicked(): Promise<void> {
    this.loading = true;
    try {
      const response = await this.authenticationService.signIn(this.signInDto);
      localStorage.setItem('token', response.token);
      localStorage.setItem('id', response.id);
      localStorage.setItem('role', response.role);
      if (response.role === 'CLIENT') {
        await this.router.navigate(['/client/profile']);
      } else {
        await this.router.navigate(['provider/profile']);
      }
    } catch (e) {
      this.messageService.add({
        severity: 'error',
        summary: 'Login failed',
        detail: 'Invalid username and password combination'
      });
    } finally {
      this.loading = false;
    }
  }

  public isSignInEnabled(): boolean {
    this.loginErrorMessages = '';
    if (this.signInDto.username.length === 0) {
      this.loginErrorMessages += 'Username is empty!\n';
    }

    if (this.signInDto.password.length === 0) {
      this.loginErrorMessages += 'Password is empty!';
    }

    return this.loginErrorMessages === '';
  }
}
