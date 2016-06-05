program
{
	graph g = readGraph("test/graph1.txt");
	vertex start = getVertexById(readDouble());
	vertex finish = getVertexById(readDouble());
	map minPaths = new map;
	
	for (vertex currentVertex : g.vertices)
	{
		if (currentVertex.equals(start))
		{
			minPath.setElement(currentVertex, 0);
		}
		else
		{
			minPath.setElement(currentVertex, infinity);
		}
	}
	
	set processVertexs = new set;
	vertex currentVertex;

	processVertexs.add(start);

	while (processVertexs.size>0)
	{
		currentVertex = processVertexs.getAny();
		for (vertex currentNeighborsVertex  : currentVertex.outVertexNeighbors)
		{
			if (currentNeighborsVertex.)
		}	
	} 
}