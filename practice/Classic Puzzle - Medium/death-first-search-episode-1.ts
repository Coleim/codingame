interface Node {
    connections: Node[];
    id: number;
    is_gateway: boolean;
    has_bobnet: boolean;
};

function toString(n: Node): string {
    return `id: ${n.id} - is_gateway ${n.is_gateway} - has_bobnet ${n.has_bobnet}
            connections: ${n.connections.map(no => no.id).join(', ')}`;
}


var inputs: string[] = readline().split(' ');
const N: number = parseInt(inputs[0]); // the total number of nodes in the level, including the gateways
const L: number = parseInt(inputs[1]); // the number of links
const E: number = parseInt(inputs[2]); // the number of exit gateways

let nodeList: Node[] = [];
for (let i = 0; i < N; ++i) {
    nodeList.push({ id: i, is_gateway: false, has_bobnet: false, connections: [] as Node[] } as Node)
}


for (let i = 0; i < L; i++) {
    var inputs: string[] = readline().split(' ');
    const N1: number = parseInt(inputs[0]); // N1 and N2 defines a link between these nodes
    const N2: number = parseInt(inputs[1]);
    nodeList[N1].connections.push(nodeList[N2]);
    nodeList[N2].connections.push(nodeList[N1]);
}
for (let i = 0; i < E; i++) {
    const EI: number = parseInt(readline()); // the index of a gateway node
    console.error("EI: ", EI)
    nodeList[EI].is_gateway = true;
}

nodeList.forEach(node => {
    console.error("-> Node: ", toString(node))
})


// game loop
while (true) {
    const SI: number = parseInt(readline()); // The index of the node on which the Bobnet agent is positioned this turn
    const botNode = nodeList[SI]


    let visited: number[] = [];
    const queue: { node: Node; path: Node[] }[] = [{ node: botNode, path: [botNode] }];

    let allPath: Node[][] = [];
    while (queue.length > 0) {
      const { node, path } = queue.shift()!;
  
      if (node.is_gateway) {
        allPath.push(path); // Found a path to a gateway node
      }
  
      visited.push(node.id);
  
      for (const neighbor of node.connections) {
        if (!visited.includes(neighbor.id)) {
          queue.push({ node: neighbor, path: path.concat(neighbor) });
        }
      }
    }

    let shortestPath: Node[] = allPath[0]
    for(let p of allPath) {
        if( p.length <= shortestPath.length) {
            shortestPath = p
        }
    }

    let last = shortestPath.map(no => no.id)
    let c1 = last[last.length-1]
    let c2 = last[last.length-2]

    console.log(`${c1} ${c2}`);
    nodeList[c1].connections = nodeList[c1].connections.filter( n => n.id === c2)
    nodeList[c2].connections = nodeList[c2].connections.filter( n => n.id === c1)
}
