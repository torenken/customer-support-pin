SHELL := /bin/bash
GOPATH := $(shell go env GOPATH)

.DEFAULT_GOAL := all
all: build

# ==============================================================================
# Define dependencies

GOLANG_CI_LINT_VERSION	:= v2.0.2

# ==============================================================================
# Install dependencies

dev-gotooling: dev-go-lint-tool dev-go-vulnerability-tool

dev-go-lint-tool:
	# see https://golangci-lint.run/
	curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(GOPATH)/bin $(GOLANG_CI_LINT_VERSION)

dev-go-vulnerability-tool:
	# see https://go.dev/blog/vuln
	go install golang.org/x/vuln/cmd/govulncheck@latest

# ==============================================================================
# Building services

AWS_PROFILE := # configure aws profile here

NAME := pin-service
LAMBDA_DIR := ./api/services
BUILD_DIR := ./build

# List of aws lambda functions (see services folder)
ALL_LAMBDAS := \
	add-more-here

build: $(addprefix build-, $(ALL_LAMBDAS))

build-%:
	CGO_ENABLED=0 GOOS=linux GOARCH=arm64 go build -ldflags="-s -w" -o ${BUILD_DIR}/$*/bootstrap ${LAMBDA_DIR}/$*

zip-%:
	zip -j ${BUILD_DIR}/$*/bootstrap.zip ${BUILD_DIR}/$*/bootstrap

deploy-%:
	aws lambda update-function-code --function-name ${NAME}-$* --zip-file fileb://${BUILD_DIR}/$*/bootstrap.zip --no-cli-pager --profile ${AWS_PROFILE}

# ==============================================================================
# Running from within aws

$(ALL_LAMBDAS):
	$(MAKE) build-$@
	$(MAKE) zip-$@
	$(MAKE) deploy-$@

$(ALL_TOOLING):
	$(MAKE) tooling-$@

# ==============================================================================
# Running tests within the local computer

test-race:
	CGO_ENABLED=1 go test -race -count=1 ./...

test-only:
	CGO_ENABLED=0 go test -count=1 ./...

lint:
	$(GOPATH)/bin/golangci-lint run --verbose --allow-parallel-runners --timeout=3m

vuln-check:
	govulncheck ./...

test-all: test-only lint vuln-check

test-all-race: test-race lint vuln-check

# ==============================================================================
# Modules support

tidy:
	go mod tidy

deps-list:
	go list -m -u -mod=readonly all

deps-upgrade:
	go get -u -v ./...
	go mod tidy
