void main()
{
	graph g = readGraph("test/graph1.txt");
	vertex v1 = createVertex(g);
	vertex v2 = createVertex(g);
	edge e1 = v1 -> v2, e2 = v1 <- v2;
	wrtieGraph(g);
}