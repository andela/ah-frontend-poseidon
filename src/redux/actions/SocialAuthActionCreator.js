import { SOCIAL_LOGIN, SOCIAL_LOGIN_FAILURE } from './types';

export const SocialLogin = response => ({
    type: SOCIAL_LOGIN,
    payload: response,
});

export const socialLoginFailure = response => ({
    type: SOCIAL_LOGIN_FAILURE,
    payload: response,
})