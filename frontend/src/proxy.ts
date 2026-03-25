import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

const AUTH_PATHS = ['/auth/login', '/auth/registration', '/auth/forgot-password'];

export function proxy(request: NextRequest) {

    const url = request.nextUrl.clone();
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    const isOnAuthPath = AUTH_PATHS.some(path => pathname.startsWith(path));

    if (!accessToken || !refreshToken) {
        if (!isOnAuthPath) {
            url.pathname = '/auth/login';
            if (!AUTH_PATHS.some(path => request.nextUrl.pathname.startsWith(path))) {
                url.searchParams.set('from', request.nextUrl.pathname);
            } else {
                url.searchParams.delete('from');
            }

            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    } else {
        if (isOnAuthPath) {
            url.pathname = '/';
            url.search = '';

            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
}
