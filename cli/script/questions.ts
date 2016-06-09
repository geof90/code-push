`
https://www.objc.io/issues/17-security/inside-code-signing/
https://msdn.microsoft.com/en-us/library/ms537361(v=vs.85).aspx
https://www.raywenderlich.com/2915/ios-code-signing-under-the-hood

Should I go hardcore with certificates like Apple?
Do we need a root CodePush CA? Seems unnecessary, self-signed cert okay?
    - How do you put in a hook that is persisted? Or is it included in the update package?
Can we use a centralized certificate store that is not CodePush?

Where to generate certificates? Hook mechanism..?
Do certificates persist after you log out?

How do I bundle with single RN jsbundle files?

IF I want to sign stuff other than just the binary:
    How do I enforce ordering robustness?
    How will patch changes work?
    How will promote work?
        - (There is no package on disk)->download and re-release? seems slow.
        - 'Augment' the release with additional metadata? How do I reference the promoted package?
    How will rollback work?
    How will the release hook work exactly, and will it plug into the two above?
    How much stuff should I sign? e.g.:
        - deploymentKey, appVersion
        - key name? should I store the pub key on the server for convenience? (nah, this is e2e only)
        - be robust against re-ordering releases (sign label?)
        - be robust against rollout percentage?
        - how do I handle patch changes?

Should I version the signing protocol? What if it changes?
    - Yes, version the metadata. Newer plugins will be back-compatible with
        older versions, older plugins will be compatible with newer metadata versions if
        they are supersets



Having to resolve the deploymentKey on each release (or appName+deploymentName on update) is stupid (or is it?)

`;