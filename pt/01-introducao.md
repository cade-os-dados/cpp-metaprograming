# Introdução

Este livro é uma introdução à metaprogramação em C++. 

Metaprogramação pode ser resumida de maneira simplória como sendo "código que gera código", com o objetivo de reduzir código repetitivo (boilerplate).

Além de eliminar código repetitivo, a metaprogramação também permite resolver expressões aritméticas ou lógicas em tempo de compilação, eliminando a necessidade de realizar estas computações em tempo de execução, tornando o programa final mais veloz.

Desde o C++11 temos ferramentas poderosas para aplicar a metaprogramação. Este livro é uma introdução a alguns dos recursos encontrados no C++11 `templates`, C++17 `fold expressions`, C++20 `concepts` e até mesmo o mais recente `reflections` (C++26) e alguns idiomas que foram sendo implementados na linguagem (como o `template for` C++26).

## Requisitos

É necessário que o leitor já tenha familiaridade com a linguagem C++ e disponha de um compilador como `clang`, `gcc` ou `msvc` para que possa reproduzir os exemplos do livro e acompanhar o raciocínio.

## Escopo

Este livro é destinado a programadores que já tenham desenvolvido a lógica de programação e tenham familiaridade com a linguagem C++, não é necessário que se tenha um conhecimento profundo da linguagem, o objetivo do livro é ser amigável a auxiliar a utilizar os recursos de metaprogramação do C++ de maneira correta.

## ⚠️ Alerta ao Leitor

Embora a metaprogramação seja bastante importante, é necessário compreender que ela possui casos de uso bastante específico e também cobra o custo de `aumentar o tempo de compilação do seu programa` e, geralmente, quando seu código apresenta algum erro, o compilador costuma produzir `mensagens gigantescas de debug`, tornando mais difícil rastrear a origem do problema.

Portanto, não recomenda-se que o leitor saia utilizando deliberadamente, a não ser para casos de estudo obviamente, e que ao final da leitura se tenha claro os contextos em que o uso de metaprogramação pode ser proveitoso.