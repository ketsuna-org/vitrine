---
layout: doc
title: $jsonArraySort[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArraySort
syntax: $jsonArraySort[key;order?]
description: Sorts a JSON array alphabetically or numerically in ascending or descending order.
---
$jsonArraySort sorts the elements of a JSON array in-place. The default order is ascending ('asc'). For alphabetical sorting, strings are compared lexicographically. For numerical sorting, values are compared as numbers. To get descending order, either pass 'desc' or sort ascending and then reverse with $jsonArrayReverse.
