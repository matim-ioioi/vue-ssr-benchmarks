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
-write - an optional parameter indicating the path to write the result, relative to "<rootDir>/results"\
--all - an optional parameter indicating that all examples will be run

All parameters except --all can be combined

```shell
npm run bench -- -d=[1,2,3,4,5]

npm run bench -- -b=[1,5,10,15]

npm run bench -- -n=<substr of name>

npm run bench -- -warmup=<number>

npm run bench -- -bench=<number>

npm run bench -- -write=<string>

npm run bench -- --all
```

Examples:

```shell
npm run bench -- -d=5

npm run bench -- -b=15

npm run bench -- -n=v-for
npm run bench -- -n=v-for-component

npm run bench -- -warmup=20

npm run bench -- -bench=10

npm run bench -- -d=5 -b=15 -n=v-for-component

npm run bench -- -warmup=0 -write=without-warmup
npm run bench -- -warmup=20 -write=warmup-20
```