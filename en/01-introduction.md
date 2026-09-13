# Introduction

This book is an introduction to C++ metaprogramming.

Metaprogramming can be simply summarized as "code that generates code", with the goal of reducing repetitive code (boilerplate).

Beyond eliminating boilerplate, metaprogramming also allows arithmetic or logical expressions to be resolved at compile time, eliminating the need to perform these computations at runtime and making the final program faster.

Since C++11, we have had powerful tools for applying metaprogramming. This book serves as an introduction to some of the features found in C++11 `templates`, C++17 `fold expressions`, C++20 `concepts`, and even the latest `reflections` (C++26) and idioms that have been implemented in the language (such as the C++26 `template for`).

## Requirements

Readers are expected to already be familiar with the C++ language and have a compiler such as `clang`, `gcc`, or `msvc` available so they can reproduce the examples in the book and follow along.

## Scope

This book is intended for programmers who have already developed programming logic and are familiar with C++. Deep, expert-level knowledge of the language is not required; the goal of the book is to be approachable and help readers correctly utilize C++ metaprogramming features.

## ⚠️ Reader Warning

Although metaprogramming is quite important, it is necessary to understand that it has very specific use cases, comes with the cost of `increasing your program's compilation time`, and usually, when your code contains an error, the compiler tends to produce `massive debug messages`, making it much harder to trace the root cause of the problem.

Therefore, readers are not advised to use it indiscriminately—except for study purposes, obviously—ensuring that by the end of the reading, they have a clear understanding of the contexts in which applying metaprogramming is truly beneficial.