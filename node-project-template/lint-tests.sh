#!/bin/bash

focused_tests="$(grep -r -n 'fdescribe(\|fit(' ./test)"

[[ -z $focused_tests ]] && exit 0;

echo "*** Focused tests found. Please fix: ***"
echo "$focused_tests"
exit 1
