

#### Problem

Find the number of consecutive tuples $(x_i, \ldots, x_j), \ 0 < i < j < n$ such that the sum $\sum_{k=i \ldots j} x_k$ is even. 

#### Greedy Solution

Compute the sum for all possible ranges and check whether the sum is even.

```python linenums="1"
num_pairs_even = 0
for i in range(n):
    for j in range(i,n):
        sum_ij = 0
        for k in range(i,j):
            sum_ij += x[k]
        if sum_ij % 2 == 0:
            num_pairs_even += 1
```

&rarr; Complexity: $O(n^3)$

#### Improved version

Precompute partial sums:

```python linenums="1"
num_pairs_even = 0
partial_sums = [x[0]]
for i in range(1, n):
    partial_sums.append(partial_sums[i-1] + x[i])
for i in range(n):
    for j in range(i,n):
    sum_ij = partial_sums[j] - partial_sums[i]
    if sum_ij % 2 == 0:
        num_pairs_even += 1
```

&rarr; Complexity: $O(n^2)$

#### Optimal solution

We can improve the runtime by exploiting the fact that we are only interested in the *number* of even pairs. In particular, only the sum of two even or two odd partial sums are even. Let $n_e$ = #even and $n_o$ = #odd partial sums. Then, the number of even pairs is equal to:

$$
n_e + \binom{n_e}{2} + \binom{n_o}{2}
$$

```python linenums="1"
from scipy.special import binom
partial_sum = 0
n_e = 0
n_o = 0
for i in range(n):
    partial_sum += x[i]
    if partial_sum % 2 == 0:
        n_e += 1
    else:
        n_o += 1
num_pairs_even = n_e + binom(n_e, 2) + binom(n_o, 2)
```

&rarr; Complexity: $O(n)$


