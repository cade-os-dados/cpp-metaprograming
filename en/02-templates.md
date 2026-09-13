<!-- Ficará em portugues mesmo, pois terei que fazer ajustes, por enquanto ainda o livro está em desenvolvimento, mas tenho que manter os arquivos em ingles para nao falhar o gerador estático e também para testar se vai renderizar no github pages -->

# Templates

Quando falamos em metaprogramação em C++, estamos falando de templates. A partir de um template, o compilador pode gerar código para diferentes tipos de dados, evitando a necessidade de reescrever a mesma função para tipos diferentes.

## Tipos genéricos

Abaixo está o exemplo mais simples possível:

```cpp
template<typename T>
T soma(T elemento1, T elemento2)
{
    return elemento1 + elemento2;
}

int main(void)
{
    float x = soma(0.1f,0.2f);
    int y = soma(1,2);
}
```

Quando declaramos a keyword `typename` estamos dizendo ao compilador para aceitar qualquer tipo, o qual nomeamos `T`, com base neste tipo, ambos os argumentos `elemento1` e `elemento2` devem ser do mesmo tipo (T) e retornar também o tipo T.

## Tamanho genérico

Templates não se tratam somente de tipos genéricos, podemos definir tamanhos genéricos também.

```cpp
#include <iostream>

template<size_t N>
int soma_vetor(int vec[N])
{
    int soma = 0;
    for(size_t k = 0; k < N; k++)
    {
        soma += vec[k];
    }
    return soma;
}

int main(void)
{
    int vec1[6] = {1,2,3,4,5,6};
    int vec2[10] = {1,2,3,4,5,6,7,8,9,10};

    std::cout << "Soma do vetor de tamanho 6: " << soma(vec1) << std::endl;
    std::cout << "Soma do vetor de tamanho 10: " << soma(vec2) << std::endl;
}
```

Como os tamanhos dos vetores são conhecidos em tempo de compilação (são arrays de tamanho fixo), então o compilador consegue identificar o tamanho do vetor e substituir no valor de N, fazendo o loop rodar até o último elemento de cada vetor. 

Repare como os templates reduzem código duplicado, agora temos uma função que funciona para qualquer tamanho de vetor, sem precisar passar o tamanho como parâmetro (como costumamos fazer em C) e sem ter que gerar um loop diferente para cada vetor.

<!--
    Depois colocar explicar o exemplo abaixo

    template<size_t N>
    std::string get_initials(std::string name)
    {
        std::string initials;
        for(size_t k = 0; k < N; k++)
        {
            initials.push_back(name[k]);
        }
        return initials;
    }
-->

## Templates para structs

Podemos definir structs usando templates também, o caso mais emblemático é de uma lista ligada:

<!--
Depois melhoramos os exemplos, lista ligada já tem na std, então pode parecer um exemplo sem muito significado
-->

```cpp
template<typename T>
struct LinkedList
{
    T data;
    LinkedList<T>* next;
    LinkedList<T>* previous;
}
```