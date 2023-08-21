# Difference Calculator :calling:

[![Actions Status](https://github.com/Uralskii/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Uralskii/frontend-project-46/actions)
<a href="https://codeclimate.com/github/Uralskii/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/b4ffa0e95fbe2a731ca2/maintainability" /></a>
![Node CI](https://github.com/Uralskii/frontend-project-46/actions/workflows/NodeCI.yml/badge.svg?event=push)
<a href="https://codeclimate.com/github/Uralskii/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/b4ffa0e95fbe2a731ca2/test_coverage" /></a>

This is a difference calculator - a program that determines the difference between two data structures. The program can work with various data formats. The result of data comparison can be expressed in three formats.

**Supported data formats:**

- JSON
- YML / YAMl

**Data output format:**

* **:zap: Stylish:** Output format in which each key has its own state.
* **:scroll: Plain:** Text output format. Each line describes a key change.
* **:books: JSON:** Structured output in JSON format.

## Requirements

- Mac
- Linux

## Installation

The utility has a basic set of commands for installation.

```bash
$ git clone git@github.com:Uralskii/Difference-Calculator.git
$ make install
$ npm link
```

## Run Test

```bash
$ make test
```

## Lint

```bash
$ make lint
```
## List Commands In Terminal

```bash
# Program help
$ gendiff -h

# Syntax feature - You need to enter the path to the file

# Run from root
# Default Output Format - Stylish
$ gendiff __fixtures__/file1.json __fixtures__/file2.json

# Output Format - Plain
$ gendiff --format plain __fixtures__/file1.json __fixtures__/file2.json

# Output Format - JSON
$ gendiff --format json __fixtures__/file1.json __fixtures__/file2.json
```

## Examples

The utility works with flat and nested formats.

**Format Stylish** :zap:
Output format in which each key has its own state.

<a href="https://asciinema.org/a/F2xkSVCP813wgXMni0StLw7t4" target="_blank"><img src="https://asciinema.org/a/F2xkSVCP813wgXMni0StLw7t4.svg" /></a>

**Format Plain** :scroll:
Text output format. Each line describes a key change.

<a href="https://asciinema.org/a/ZWLNylSkngFAdTG3Y42adHZiZ" target="_blank"><img src="https://asciinema.org/a/ZWLNylSkngFAdTG3Y42adHZiZ.svg" /></a>

**Format JSON** :books:
Structured output in JSON format.

<a href="https://asciinema.org/a/CCTfNDI59emgBA8ux9k5knHAb" target="_blank"><img src="https://asciinema.org/a/CCTfNDI59emgBA8ux9k5knHAb.svg" /></a>