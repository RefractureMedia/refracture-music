## Security

### Third-party plugins

All plugin code* will be reviewed by staff via the bundler submitting it to Supervisor, and hash checked by compiling the source with Supervisor. Any plugin releases that produce an invalid hash upon download will be rejected by the client, and will notify the Supervisor. In the event a plugin release is confirmed by Supervisor to be producing an invalid hash, the plugin will be rejected by every client and the repository host will be notified.