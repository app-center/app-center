Project = Xiner-Webadmin

Version := $(shell git describe --tags --dirty --match="XA*" 2> /dev/null || echo XA0.0.0-dirty)

EnvList := dev gray qc prod
ReleaseOutput := out
BuildOutput := build
VersionZipTarget := $(foreach e,$(EnvList),$(ReleaseOutput)/$(Version)/$(Version)__$(e).zip)
VersionDirTarget := $(ReleaseOutput)/$(Version)

Env ?= prod

# https://stackoverflow.com/questions/44995853/a-makefile-recipe-runs-every-time-even-when-target-is-more-recent-than-dependenc
node_modules: package.json package-lock.json
	npm install
	@touch -m node_modules

dev: Env = dev
dev: -dev
.PHONY: dev

dev-gray: Env = gray
dev-gray: -dev
.PHONY: dev-gray

dev-qc: Env = qc
dev-qc: -dev
.PHONY: dev-qc

release:
	@make release-dev
	@make release-gray
	@make release-qc
	@make release-prod
	@cd $(VersionDirTarget); zip -r ../$(Version).zip *
.PHONY: release

release-dev: Env = dev
release-dev: -release-ver
.PHONY: release-dev

release-gray: Env = gray
release-gray: -release-ver
.PHONY: release-gray

release-qc : Env = qc
release-qc : -release-ver
.PHONY: release-qc

release-prod: Env = prod
release-prod: -release-ver
.PHONY: release-prod

.env.production:
	cp ./env/production.$(Env) .env
.PHONY: .env.production

.env.development:
	cp ./env/development.$(Env) .env
.PHONY: .env.development

$(VersionDirTarget):
	mkdir -p $@
.PHONY: $(VersionDirTarget)

$(VersionZipTarget): build $(VersionDirTarget)
	cd build; zip -r ../$@ *
.PHONY: $(VersionZipTarget)

clean-build:
	rm -rf $(BuildOutput)
.PHONY: clean-build

build: clean-build
	npm run build
.PHONY: build

-dev: .env.development node_modules
	npm start
.PHONY: -dev

-release-ver: .env.production node_modules
	@make $(ReleaseOutput)/$(Version)/$(Version)__$(Env).zip
.PHONY: -release-ver
