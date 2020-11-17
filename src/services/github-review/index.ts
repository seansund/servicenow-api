import {Container, Scope} from 'typescript-ioc';
import {GithubReviewApi} from './github-review.api';
import {GithubReviewService} from './github-review.service';

export * from './github-review.api';

Container.bind(GithubReviewApi).to(GithubReviewService).scope(Scope.Singleton);
