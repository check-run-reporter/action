FROM bash:5.0.7

LABEL version="1.0.0"
LABEL repository="http://github.com/check-run-reporter/action"
LABEL homepage="http://github.com/check-run-reporter/action"
LABEL maintainer="Ian Remmel, LLC <support@check-run-reporter.com>"

LABEL com.github.actions.name="Check Run Reporter"
LABEL com.github.actions.description="Upload structure reports to check-run-reporter.com"
LABEL com.github.actions.icon="check"
LABEL com.github.actions.color="orange"

RUN apk add curl

COPY "entrypoint" "/entrypoint"
ENTRYPOINT ["/entrypoint"]
CMD ["entrypoint"]