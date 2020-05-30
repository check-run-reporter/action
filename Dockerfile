FROM bash:5.0.7

LABEL version="1.0.0"
LABEL repository="http://github.com/check-run-reporter/action"
LABEL homepage="http://github.com/check-run-reporter/action"
LABEL maintainer="Ian Remmel, LLC <support@check-run-reporter.com>"

RUN apk add curl
RUN apk add git

COPY "entrypoint" "/entrypoint"
ENTRYPOINT ["/entrypoint"]
CMD ["entrypoint"]
