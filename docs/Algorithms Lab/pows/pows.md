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


## Defensive Line

#### Problem

#### Difficulties
Formulating as dynamic program, getting indices and < and \> correct. Wrong data structure. Thinking too complicate. Keep code simple.

#### Techniques
Dynamic Program, sliding window

#### Solution

```c++ linenums="1"
#include <iostream>
#include <vector>
#include <utility>
#include <algorithm>

using namespace std;

int step(int seg_i, int m_start, int m, int num_segments, std::vector<int> &to,
         std::vector<std::pair<int, int>> &segments,
         std::vector<std::vector<int>> &memo) {

  // all attackers already busy
  if (m_start == m) return 0;

  // invalid configuration
  if (seg_i >= num_segments && m_start < m) return -1000000000; // small number avoids check

  // check memory
  if (memo[seg_i][m_start] != -2) return memo[seg_i][m_start];

  int without_seg_i = step(seg_i + 1, m_start, m, num_segments, to, segments, memo);
  int with_seg_i = segments[seg_i].second - segments[seg_i].first + 1
                   + step(to[seg_i], m_start + 1, m, num_segments, to, segments, memo);

  // save to memory
  memo[seg_i][m_start] = std::max(without_seg_i, with_seg_i);
  return memo[seg_i][m_start];
}

void testcase() {
  int n, m;
  int k;
  std::cin >> n >> m >> k;
  // pre compute partial sums
  vector<int> s(n + 1, 0);
  for (int i = 1; i < n + 1; ++i) {
    std::cin >> s[i];
    s[i] += s[i - 1];
  }

  // sliding window to find segments
  int i = 1, j = 1;
  std::vector<std::pair<int, int>> segments;
  segments.reserve(n);
  std::vector<int> start(n + 1, -1), end(n + 1, -1);
  while (j < n + 1) {
    int def_value = s[j] - s[i - 1];
    if (def_value == k) {
      segments.emplace_back(i, j);
      int seg_id = segments.size() - 1;
      end[j] = seg_id;
      start[i] = seg_id;
      i++;
      j++;
    } else if (def_value > k) {
      i++;
      if (i > j) j++;
    } else {
      j++;
    }
  }
  int num_segments = segments.size();

  // compute *to* vector to save computation
  std::vector<int> to(num_segments, num_segments);
  std::vector<int> closed;
  for (int l = 1; l < n + 1; ++l) {
    if (start[l] != -1) {
      // every segment gets iterated at most once
      // total runtime is O(2*n)
      for (auto it : closed) to[it] = start[l];
      closed.clear();
    }
    if (end[l] != -1) closed.emplace_back(end[l]);
  }

  // dynamic program
  std::vector<std::vector<int>> memo(num_segments, std::vector<int>(m, -2));
  int max_value = step(0, 0, m, num_segments, to, segments, memo);
  if (max_value > -1)
    cout << max_value << endl;
  else
    cout << "fail" << endl;
}

int main() {
  std::ios_base::sync_with_stdio(false);
  int t;
  std::cin >> t;
  for (int i = 0; i < t; ++i) {
    testcase();
  }
  return 0;
}
```

## MotorCycles

#### Problem
Find lucky bikers that driver forever and start from vertical line.

#### Difficulties
Runtime Analysis (How to proof runtime?), sorting with tracking permutation

#### Techniques
CGAL, Intersection

#### Solution

```c++ linenums="1"
#include <iostream>
#include <vector>
#include <algorithm>
#include <stack>

#include <CGAL/Exact_predicates_exact_constructions_kernel.h>

typedef CGAL::Exact_predicates_exact_constructions_kernel K;

typedef K::Ray_2 R;
typedef K::Point_2 P;

using namespace std;

void testcase() {
  int n;
  cin >> n;

  vector<pair<long, int>> y1_n_id(n);
  y1_n_id.reserve(n);
  vector<R> rays(n);
  rays.reserve(n);
  for (int i = 0; i < n; ++i) {
    long y1, x2, y2;
    cin >> y1 >> x2 >> y2;
    rays[i] = R(P(0, y1), P(x2, y2));
    y1_n_id[i] = make_pair(y1, i);
  }

  sort(y1_n_id.begin(), y1_n_id.end(), std::greater<>());

  vector<int> luckyDrivers;
  for (int i = 0; i < n; ++i) {
    int rid = y1_n_id[i].second;
    auto ray = rays[rid];
    /*
     * NOTE the runtime is O(n) even though we iterate over lucky drivers. 
     * However, since we stop the iteration as soon as there is no intersection.
     * Hence, every lucky driver except the last one will be iterated at most twice.
     * If the next ray r2 is parallel to r1, r2 will be a lucky
     * driver as well. If that is the case and there is another ray r3 that
     * intersects with r2, then also r3 intersects with r1 and r1 will be deleted.
     */
    while (true) {
      if (luckyDrivers.empty()) {
        luckyDrivers.emplace_back(rid);
        break;
      } else {
        auto ray2 = rays[luckyDrivers.back()];
        // check if drivers intersect
        if (CGAL::do_intersect(ray, ray2)) {
          auto o = CGAL::intersection(ray, ray2);
          if (const P *op = boost::get<P>(&*o)) {
            auto d1 = CGAL::squared_distance(*op, ray.source());
            auto d2 = CGAL::squared_distance(*op, ray2.source());
            // check which is first
            if (d1 <= d2) {
              luckyDrivers.pop_back();
            } else {
              break;
            }
          }
        } else {
          luckyDrivers.emplace_back(rid);
          break;
        }
      }
    }
  }
  sort(luckyDrivers.begin(), luckyDrivers.end());
  for (auto id : luckyDrivers) cout << id << " ";
  cout << endl;
}

int main() {
  ios_base::sync_with_stdio(false);
  int t;
  cin >> t;
  while (t--) testcase();
}
```

## Tracking

#### Problem

#### Difficulties

#### Techniques

#### Solution


## Octopussy

#### Problem

#### Difficulties
Proofing greedy (Proof by replacement), Reading things correctly

#### Techniques
Greedy

#### Solution

Propagate minimum time from root to leaf nodes. Take always the node with the smallest time. Proof of correctness (proof by replacement (TODO?)): Let $V$ denote the set of nodes that we have already visited. Let $v_n$ denote the node that the greedy algorithm will visit next. Assume that we do not arrive in time for $v_n$, however, let's further assume that there is an **optimal solution** that arrives at $v_n$ in time. Note that by design all nodes in $V$ have to be visited before $v_n$. In order to arrive at $v_n$ in time we would have to remove at least one node from $V$. However, this is a **contradiction** to our observation that all nodes in $V$ have to be visited before $v_n$. Hence, if the greedy algorithm cannot visit all nodes in time then there is also no optimal solution that would achieve that.

```c++ linenums="1"
//
// Created by Krispin Wandel on 15.01.21.
//

#include <iostream>
#include <vector>
#include <queue>

using namespace std;

void testcase() {
	int n;
	cin >> n;

	vector<int> t(n);
	for (int i = 0; i < n; ++i) {
		cin >> t[i];
	}

	vector<int> min_t(n);
	min_t[0] = t[0];
	for (int i = 1; i < n; i += 2) {
		// children c_i,1 and c_i,2 of i:
		// c_i,1 = 2 * i + 1,
		// c_i,2 = 2 * i + 2
		int parent = (i - 1) / 2;
		min_t[i] = min(min_t[parent] - 1, t[i]);
		min_t[i + 1] = min(min_t[parent] - 1, t[i + 1]);
	}

	int counter = 0;
	bool is_possible = true;
	vector<bool> visited(n, false);
	priority_queue<int, std::vector<pair<int, int>>, std::greater<>> pq;
	// push leaf nodes
	for (int i = (n - 1) / 2; i < n; ++i) {
		pq.push(make_pair(min_t[i], i));
	}

	while (!pq.empty()) {
		// get child with smallest min_t
		auto sel = pq.top();
		pq.pop();
		// check if we are in time
		if (counter < sel.first) {
			counter++;
		} else {
			is_possible = false;
			break;
		}
		// push children to pq
		int i = sel.second;
		visited[i] = true;
		if (i > 0) {
			bool is_second_child = i % 2 == 0;
			int parent = (i - is_second_child * 2 - !is_second_child * 1) / 2;
			// only checkout parent is neighbour has been visited as well
			if (visited[i - is_second_child + !is_second_child])
				pq.push(make_pair(min_t[parent], parent));
		}
	}

	if (is_possible) cout << "yes";
	else cout << "no";
	cout << endl;
}

int main() {
	int t;
	cin >> t;
	while (t--) testcase();
}
```

## Surveillance Photographs

#### Problem

#### Difficulties
Do not run breadth first search on maxflow graph. Reading things correctly. For first test set: police men starts and ends at the same police station.

#### Techniques
Maximum Flow, Breadth First Search

#### Solution

```c++ linenums="1"
#include <iostream>
#include <vector>
#include <set>

// BGL include
#include <boost/graph/adjacency_list.hpp>
// BGL flow include *NEW*
#include <boost/graph/push_relabel_max_flow.hpp>
#include <boost/graph/breadth_first_search.hpp>
#include <boost/graph/properties.hpp>

// Graph Type with nested interior edge properties for flow algorithms
typedef boost::adjacency_list_traits<boost::vecS, boost::vecS, boost::directedS> traits;
typedef boost::adjacency_list<boost::vecS, boost::vecS, boost::directedS, boost::no_property,
				boost::property<boost::edge_capacity_t, long,
								boost::property<boost::edge_residual_capacity_t, long,
												boost::property<boost::edge_reverse_t, traits::edge_descriptor>>>> graph;
typedef boost::adjacency_list<boost::vecS, boost::vecS, boost::directedS> graph2;
typedef traits::vertex_descriptor vertex_desc;
typedef traits::edge_descriptor edge_desc;

// For BFS
typedef boost::default_color_type color;

class edge_adder {
		graph &G;
public:
		explicit edge_adder(graph &G) : G(G) {}

		void add_edge(int from, int to, long capacity) {
			auto c_map = boost::get(boost::edge_capacity, G);
			auto r_map = boost::get(boost::edge_reverse, G);
			const auto e = boost::add_edge(from, to, G).first;
			const auto rev_e = boost::add_edge(to, from, G).first;
			c_map[e] = capacity;
			c_map[rev_e] = 0; // reverse edge has no capacity!
			r_map[e] = rev_e;
			r_map[rev_e] = e;
		}
};

using namespace std;

void testcase() {
	int n, m, k, l;
	cin >> n >> m >> k >> l;
	/**
	 * n = #intersections
	 * m = #one-way streets
	 * k = #police stations
	 * l = #photographs
	 */

	graph G(n);
	graph2 G2(n);
	edge_adder adder(G);

	set<int> police;
	vector<int> num_police(n, 0);
	for (int i = 0; i < k; ++i) {
		int x;
		cin >> x;
		num_police[x]++;
		police.insert(x);
	}
	
	set<int> photo;
	vector<int> num_photo(n, 0);
	for (int i = 0; i < l; ++i) {
		int x;
		cin >> x;
		num_photo[x]++;
		photo.insert(x);
	}

	for (int i = 0; i < m; ++i) {
		int x, y;
		cin >> x >> y;
		adder.add_edge(x, y, 1);
		boost::add_edge(x, y, G2);
	}

	// for each police station check which photos are reachable
	vector<vector<int>> police_to_photo(n, vector<int>());
	for (int x : police) {
		// breadth first search
		std::vector<color> vertex_color(n); // exterior property map
		// O(n + m)
		boost::breadth_first_search(G2, x,
																boost::color_map(boost::make_iterator_property_map(
																				vertex_color.begin(), boost::get(boost::vertex_index, G))));
		// O(n)
		const color black = boost::color_traits<color>::black(); // visited by BFS
		// const color white = boost::color_traits<color>::white();
		for (int xp : photo) {
			if (vertex_color[xp] == black) {
				police_to_photo[x].emplace_back(xp);
			}
		}
	}

	// add capacity to photo nodes
	for (int x : photo) {
		adder.add_edge(n + x, x, num_photo[x]);
	}

	// Add special vertices source and sink
	const vertex_desc v_source = boost::add_vertex(G);
	const vertex_desc v_sink = boost::add_vertex(G);

	// create flow graph to solve problem
	for (int x : police) {
		vertex_desc v_source_police = boost::add_vertex(G);
		adder.add_edge(v_source, v_source_police, num_police[x]);
		for (int xp : police_to_photo[x]) {
			// NOTE capacity for this edge could be infinity
			adder.add_edge(v_source_police, n + xp, num_photo[xp]);
		}
		adder.add_edge(x, v_sink, num_police[x]);
	}

	// check max flow
	long flow = boost::push_relabel_max_flow(G, v_source, v_sink);
	cout << flow << endl;
}

int main() {
	ios_base::sync_with_stdio(false);
	int t;
	cin >> t;
	while (t--) testcase();
}
```
