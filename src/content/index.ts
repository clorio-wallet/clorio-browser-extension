// @ts-ignore
import inpageUrl from '../inpage/index.ts?script&module';

console.log("Content script loaded");

// Inject inpage script
const script = document.createElement('script');
script.src = inpageUrl;
script.type = 'module';
(document.head || document.documentElement).appendChild(script);

// Content Script (Untrusted)
// Message relay only, no key data

