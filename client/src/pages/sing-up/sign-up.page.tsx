import { FormPageLayout } from '@/shared/layouts/form-page-layout';
import { Roboto } from 'next/font/google';
import { SignUpForm } from './ui/SignUpForm';

const roboto = Roboto({ subsets: ['latin'], weight: ['400'] });

export function SignUpPage() {
    return (
        <FormPageLayout
            font={roboto}
            title="Sign up to continue"
            form={<SignUpForm />}
        />
    );
}
