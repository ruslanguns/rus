import { Injectable } from '@angular/core'

import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { AccountUpdatePasswordInput, ApolloAngularSDK } from '@rus/web/core/data-access'
import { mergeMap } from 'rxjs/operators'

interface AccountPasswordState {
  errors?: any
  loading: boolean
}

@Injectable()
export class AccountPasswordStore extends ComponentStore<AccountPasswordState> {
  constructor(private readonly sdk: ApolloAngularSDK) {
    super({ loading: false })
  }

  readonly vm$ = this.select(({ errors, loading }) => ({ errors, loading }))

  readonly updatePasswordEffect = this.effect<AccountUpdatePasswordInput>((input$) =>
    input$.pipe(
      mergeMap((input) =>
        this.sdk.accountUpdatePassword({ input }).pipe(
          tapResponse(
            ({ errors }) => this.patchState({ errors }),
            (errors) => this.patchState({ errors, loading: false }),
          ),
        ),
      ),
    ),
  )
}
