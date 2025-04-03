const targetMap = new Map();
let activeFunction = null;

function trackDependencies(target, key) {
  if (!activeFunction) return;
  let dependencyMap = targetMap.get(target);
  if (!dependencyMap) {
    dependencyMap = new Map();
    targetMap.set(target, dependencyMap);
  }
  let functionsToRun = dependencyMap.get(key);
  if (!functionsToRun) {
    functionsToRun = new Set();
    dependencyMap.set(key, functionsToRun);
  }
  functionsToRun.add(activeFunction);
  //   console.log(targetMap);
}

function triggerDependency(target, key) {
  let dependencyMap = targetMap.get(target);
  if (!dependencyMap) return;
  let functionsToRun = dependencyMap.get(key);
  if (functionsToRun) {
    functionsToRun.forEach((fn) => fn());
  }
}

function update(fn) {
  const _update = () => {
    activeFunction = fn;
    try {
      fn();
    } finally {
      activeFunction = null;
    }
  };
  _update();
}
