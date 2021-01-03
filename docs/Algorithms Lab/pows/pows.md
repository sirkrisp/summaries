## Deck of Cards

#### Problem
Find an interval $[i,j], \ i \leq j$ such that
$$
\left| \sum_{l=i}^j v_l - k \right|, \quad v_l \geq 0
$$
is minimized. If there are multiple solutions, take the one that is *lexicographically* smaller (iff $i < i'$ or $i \leq i'$ and $j < j'$).

#### Difficulties
Getting indices right

#### Techniques
Sliding window, Pre-computation of partial sums

#### Solution

```c++ linenums="1"
#include <iostream> // We will use C++ input/output via streams
#include <vector>
#include <limits>
#include <cmath>

void testcase() {
    int n; std::cin >> n; // Read the number of integers to follow
    int k; std::cin >> k;
    
    std::vector<int> values(n);
    for(int i = 0; i < n; ++i){
      int v_i; std::cin >> v_i;
      values[i] = v_i;
    }
    
    // pre-compute partial sums
    std::vector<int> S(n+1);
    S[0] = 0;
    for(int i = 1; i < n+1; ++i){
      S[i] = S[i-1] + values[i-1];
    }
    
    // sliding window
    int min_diff = std::numeric_limits<int>::max();
    int i = 0, j = 0, i_min = 0, j_min = 0;
    while(j < n){
      int d = S[j+1] - S[i+1-1] - k;
      int diff = std::abs(d);
      if(diff < min_diff){
        min_diff = diff;
        i_min = i; j_min = j;
      }
      if(d > 0){
        if(i < j){
          i++;
        }else{
          j++;
        }
      }else{
        j++;
      }
    }
    std::cout << i_min << " " << j_min << std::endl;
}

int main() {
    std::ios_base::sync_with_stdio(false); // Always!
    int t; std::cin >> t;
    for(int i = 0; i < t; ++i)
      testcase(); // Solve a particular test case
}
```

## From Russia with Love

#### Problem
Find minimal optimal winnings for player k *regardless*  

#### Difficulties
getting indices right

#### Techniques
Dynamic Programming

#### Solution

```c++ linenums="1"
#include <iostream> // We will use C++ input/output via streams
#include <vector>
#include <limits>
#include <cmath>

typedef std::vector<std::vector<int>> VVI;

int step(int i, int j, int m, std::vector<int>& x, VVI& S){
  if(i == j) return x[i];
  if(i > j) return 0;
  
  if(S[i][j] != -1) return S[i][j];
  
  int min_winnings_left = std::numeric_limits<int>::max();
  int min_winnings_right = std::numeric_limits<int>::max();
  for(int l = 0; l <= m-1; ++l){
    min_winnings_left = std::min(x[i] + step(i+1+l, j-(m-1-l), m, x, S), 
                                  min_winnings_left);
    min_winnings_right = std::min(x[j] + step(i+l, j-1-(m-1-l), m, x, S), 
                                  min_winnings_right);
  }
  S[i][j] = std::max(min_winnings_left, min_winnings_right);
  return S[i][j];
}

void testcase() {
  int n; std::cin >> n; // number of coins
  int m; std::cin >> m; // number of passengers
  int k; std::cin >> k; // id of passenger whose winnings we should maximize
  
  std::vector<int> x(n);
  for(int i = 0; i < n; ++i){
    std::cin >> x[i];
  }
  
  VVI S(n, std::vector<int>(n, -1));
  
  int min_winnings = std::numeric_limits<int>::max();
  int i = 0, j = n-1;
  for(int l = 0; l <= k; ++l){ // k == #passengers before k
    min_winnings = std::min(step(i+l, j-(k-l), m, x, S), min_winnings);
  }
  
  std::cout << min_winnings << std::endl;
}

int main() {
  std::ios_base::sync_with_stdio(false); // Always!
  int t; std::cin >> t;
  for(int i = 0; i < t; ++i)
    testcase(); // Solve a particular test case
}
```