# vue-ssr-benchmarks

Source code: https://github.com/jackyef/ssr-benchmarks

I just added a few different examples (for vue 3 only) to see which approach gives the best time

Local machine on which the tests were run:
- NodeJS v20.11.1
- AMD Ryzen 5 4600H with Radeon Graphics
- RAM 16.0 GB 3200 mhz

# setup

```shell
npm ci
```

# build

```shell
npm run build
```

# bench options

-d - an optional parameter indicating the depth. Examples with this depth only will be run\
-b - an optional parameter indicating the breadth. Examples with this breadth only will be run\
-n - an optional parameter for name of the example. Examples which includes specified name only will be run\
-warmup - an optional parameter indicating the number of warm up runs before benchmarking begins\
-bench - an optional parameter indicating the number of benchmark runs\
--all - an optional parameter indicating that all examples will be run

All parameters except --all can be combined

```shell
npm run build -- -d=[1,2,3,4,5]

npm run build -- -b=[1,5,10,15]

npm run build -- -n=<substr of name>

npm run build -- -warmup=<number>

npm run build -- -bench=<number>

npm run build -- --all
```

Examples:

```shell
npm run build -- -d=5

npm run build -- -b=15

npm run build -- -n=v-for
npm run build -- -n=v-for-component

npm run build -- -warmup=20

npm run build -- -bench=10

npm run build -- -d=5 -b=15 -n=v-for-component
```