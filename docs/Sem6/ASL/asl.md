# Advanced Systems Lab lectures

## Lecture 2 - Performance Cost Analysis
$\Theta$, $\Omega$ and $O$ describe sets and are related through:

$$\Theta = \Omega \cap O$$

What can be analyzed?

- Runtime
- Space (= memory footprint)
- Data movement (e.g. between cache and memory)

Memory accesses only add a constant factor to the asymptopic runtime.

**Goal:** Exact cost of an algorithm

Cost = number of relevant (e.g. adds, mults, divs) operations, **only the operations that constitute the mathematical algorithm**.

**How to do** cost analysis?

- Define suitable cost measure
- Count in algorithm or code (Recursive function -> solve recurrence)
- Instrument Code (?)
- Performance Counters

**Cost Analysis** *enables* **Performance Analysis** which is **bounded by machine's peak performance**:

$$ \text{performance} = \frac{\text{cost}}{\text{runtime or cycles}}$$

## Lecture 3 - Architecture/ Microarchitecture and Intel Core

#### Architecture 
= instruction set architecture = ISA = Part of processor design that needs to understand to write assembly code. (intstruction set specifications, registers)

x86 backwards compatible to 8086 processor.

#### ISA SIMD Vector extensions

- Parallel computation on short integer/float vectors (length 2-8)
- Useful and *easy to build*

#### FMA = Fused Multiply-Add

- Only one rounding step $\rightarrow$ better accuracy

#### Microarchitecture

= Implementation of the architecture

- ld = load, st = store
- **CISC** ops (Complex instruction set computer) -> decoded -> **RISC** ops (Reduced instruction set computer)
- DCache = Double Cache
- ICache = Instruction Cache

#### Runtime Lower Bounds (Cycles)

- TODO why 50% peak performance when n/4
- In Haswell, to write a variable, the variable has to be loaded as well.

#### Operational Intensity

$$
I(n) = \frac{W(n)}{Q(n)}
$$

where $W(n)$ = number of flops and $Q(n)$ = number of memory transfers (usually only reads) in **bytes**.

#### Memory/Compute Bound

- Compute bound = high operational density
- memory bound = low operational density
- Later: **Roofline model**

#### Superscalar Computer
- Multiple instructions per cycle

#### Mapping of execution units to ports
- Instructions are pipelined (latency = number of cycles a operation takes to execute)
- However, we cannot issue a division every cycle (look at throughput)
- **fma can be used for add and mult**

## Lecture 4 - Optimizing for Instruction-Level Parallelism

#### How to get OP / cycle close to throughput?

Example: Reduce OP (OP = * or +)

#### Naive Approach

Time (Cycles): N * Latency

#### With K Accumulators

Time Minimum achievable (is we get close to throughput): ceil(N / throughput) + latency - 1

K = #accumulators = ceil(latency/ gap) = ceil(latency * throughput)

Note: **Loop unrolling factor L** equals K. Loop untrolling does not help. May be needed to enable additional transformations (e.g. reassociation [Reassociation changes result for floating point OPs](https://stackoverflow.com/questions/6430448/why-doesnt-gcc-optimize-aaaaaa-to-aaaaaa))

## Lecture 5 - Compiler Optimizations

Pre-computations
- TODO
- Strength Reduction (replace mult/div with sum/diff)
- Share Common Subexpressions (exploit arithmetic preoperties)

- Function inlining

Optimization Blockers:
- Procedure Calls
- Memory Aliasing -> remove -> allocating register

## Lecture 6 - SIMD extensions, AVX, vectorization

SSE nearly obsolete - replaced by AVX
mm = multi media
xmm, ymm, zmm

## Lexture 7 - SIMD extensions, AVX, vectorization cont'd

**AVX Intrinsics**

- We can use intrinsics operations to avoid memory aliasing
- image filters (moving average)
- Furier butterfly operations

## Lecture 8 - Memory hierarchy, locality, caches

#### Processor-memory bottleneck

#### Locality
- temporal (loops, also in code)
- spatial (also registers count, tranfer data in blocks 64 Byte)

#### Policies of Cache
- Placement
- Replacement

#### Types of Cache Misses
- Compulsory (cold): Occurs on first access to a block
- Capacity: Working set is larger than the cache 
- Conflict: Cache large enough, but multiple data objects all map to the same slot

#### Cache structure
- E = ?, B = block size, S = number of sets

#### Cache performance metrics
- miss rate
- hit time
- miss penalty

#### Writes
- Write-back/ write-allocate
- Write-through/ no-write-allocate

## Lecture 9 - Memory hierarchy, locality, caches cont'd

- S = 
- W = 
- C = 

update only updates one double

use blocks in Matrix-Matrix-Multiplications for locality

The Killer: Two-Power Strided Working Sets
- Occurence:
    - Image processing

## Lecture 11 - Roofline model

log - log plot -> polynomials become lines


Roofline -> one takes only data movements into account and NOT data dependencies (which could still lead to tighter memory bounds)

For data movement only consider the highest order time. If data is used more than once, we only give a lower bound because we neglect potential cache misses.


TOOD Roofline for parallel code -> FLOPS/cycle does not increase but only bandwidth??

## Dense linear algebra, LAPACK/BLAS, ATLAS, fast MMM

- LAPACK relies on low level BLAS functions
- BLAS functions have to be re-implemented for each new processor
- ATLAS first determines various hardware parameters (such as latency) through measurements, and then performs an excessive search over a pre-defined search space of parameters needed to generate BLAS functions. In each search iteration the performance of the BLAS function is measured and used as feedback for the search direction.
- In 2005, model-based code generating (replace search with model)


TODO recap some concepts

##### Blocking for Registers

##### Dependencies

- Read after write (or true dependency)
- Write after read (or antidependency) -> rename, compiler, hardware
- Write after write (or output dependency) -> rename

##### Virtual Memory System

## Sparse Linear algebra

##### Sparse MVM
- CSR format -> store col indices and row-start indices
- Poor temporal locality for x but spatial locality in all arrays
- Temporal locality in y

##### Block MVM
- BCSR format -> store all blocks that are not completely zero
- More memory, less indices, temporal locality in x
- Block sizes hard to predict

TODO recap model

## Discrete Fourier transform, fast Fourier transform



















