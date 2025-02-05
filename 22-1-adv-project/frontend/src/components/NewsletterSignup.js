import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
    // useFetcher is a hook that provides a form component to handle form submission
    // it sends the inputs behind and without route transition
    // the navigation is done by route transition
    const fetcher = useFetcher();
    const { data, state } = fetcher;
    useEffect(() => {
        if (state === 'idle' && data && data.message) {
            window.alert(data.message);
        }
    }, [data, state]);
    return (
        <fetcher.Form
            action='/newsletter'
            method="post"
            className={classes.newsletter}
        >
            <input
                type="email"
                placeholder="Sign up for newsletter..."
                aria-label="Sign up for newsletter"
            />
            <button>Sign up</button>
        </fetcher.Form>
    );
}

export default NewsletterSignup;