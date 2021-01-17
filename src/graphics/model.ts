import * as IndexTuple from './struct/indextuple'
import * as Vec2 from './struct/vec2'
import * as Mat2d from './struct/mat2d'
import * as Point from './struct/point';
import * as Rect from './struct/rect';
import VertexBuf from './vertexbuf';

/**
 * Stores static polygon data that multiple shapes can share.
 */
export class Model {

    /**
     * The polygon vertices.
     */
    public vertices: VertexBuf;

    /**
     * The indices that divide the polygon into renderable triangles.
     */
    public indices: IndexTuple.Buf;

    /**
     * The boundaries of the polygon.
     */
    public bounds: Rect.Obj;

    /**
     * The point that remains fixed when stretch rotating the polygon.
     */
    public pivot = new Point.Obj();

    /**
     * The point that determines the length and direction of the line for stretch rotating the polygon.
     */
    public control = new Point.Obj();

    /**
     * Stores the byte offset of this mesh's index data in an element buffer. Defaults to 0.
     */
    public elementBufferOffset = 0;

    /**
     * Stores the byte offset of this mesh's vertex data in a vertex buffer. Defaults to 0.
     */
    public vertexBufferOffset = 0;

    /**
     * Creates a mesh with the specified polygon data.
     * @param vertices the polygon vertices.
     * @param indices the indices that divide the polygon into renderable triangles.
     * @param fixedPoint the point that remains fixed under stretch rotation.
     * @param controlPoint the point that determines the length and direction of the line for stretch rotation.
     * @param bounds the boundaries of the polygon.
     */
    constructor(
        vertices: VertexBuf,
        indices: IndexTuple.Buf,
        bounds = vertices.calculateBounds(),
        pivot = <Point.Obj> bounds.centerTop(new Point.Obj()),
        control = <Point.Obj> bounds.centerBottom(new Point.Obj()))
    {
        this.vertices = vertices;
        this.indices = indices;
        this.bounds = bounds;
        this.pivot = pivot;
        this.control = control;
    }

    static fromSource(src: ModelStructure) {
        let vertices = new VertexBuf(src.vertices);
        let indices = src.indices ? new IndexTuple.Buf(src.indices) : polygonIndices(vertices.capacity());
        return new Model(vertices, indices);
    }

    /**
     * Creates the model for a regular polygon with n sides.
     * @param n how many sides the polygon should have.
     */
    static polygon(n: number) {
        // Generate the vertices
        let vertices = polygonVertices(n);
        // Generate the indices
        let indices = polygonIndices(n);
        //Construct the model and return
        return new Model(vertices, indices);
    }

    /**
     * Creates the model for a star with n points and the specified inner and outer radii.
     * @param n how many points the star should have.
     * @param innerRadius distance from center of star to inner vertex.
     * @param outerRadius distance from center of start to outer vertex.
     */
    static star(n: number, innerRadius: number, outerRadius: number) {
        // Generate the vertices
        let vertices = starVertices(n, innerRadius, outerRadius);
        // Generate the indices
        let indices = starIndices(n);
        //Construct the model and return
        return new Model(vertices, indices);
    }

    /**
     * Creates the model for a 4 vertex diamond.
     */
    static diamond() {
        return Model.star(2, .5, 1)
    }

    /**
     * Creates the model for a square.
     */
    static square() {
        return Model.rectangle(Rect.Obj.ltrb(0, 1, 1, 0));
    }

    /**
     * Creates the model for a rectangle
     */
    static rectangle(rect: Rect.Obj) {
        // Extract the verties from the rect
        let vertices = rectVertices(rect);
        // Indices are same as polygon(4)
        let indices = polygonIndices(4);
        // Construct model and return
        return new Model(vertices, indices, rect);
    }

    /**
     * Creates the model for a 5 point star.
     */
    static star5() {
        return Model.star(5, 0.4, 1); //Star
    }

    /**
     * Checks if this model contains the specified point.
     * @param pt the point to check.
     */
    contains(pt: Point._) {
        return this.contains$(pt.x, pt.y);
    }

    /**
     * Checks if this model contains the point (x,y).
     * @param x the x coordinate of the point to check.
     * @param y the y coordinate of the point to check.
     */
    contains$(x: number, y: number) {
        //First check if the point lies inside the boundaries of this model
        //If it does, check if the point also lies inside the vertex path
        return this.bounds.containsPoint$(x,y) && this.vertices.contains$(x,y);
    }
}

interface ModelStructure {
    vertices: Float32Array,
    indices?: Uint16Array
}

/**
 * Extracts the vertices from the specified rect into a new vertex buffer.
 * @param rect the rect from which to extract the vertices.
 */
export function rectVertices(rect: Rect._) {
    return new VertexBuf(
        new Float32Array([
            rect.left, rect.top,
            rect.left, rect.bottom,
            rect.right, rect.bottom,
            rect.right, rect.top])
    );
}

/**
  * Generates the vertices for a regular polygon centered at (0,0).
  * @param sides how many sides the polygon should have.
  * @param radius distance from center of polygon to a vertex.
  */
export function polygonVertices(sides: number, radius = 1) {
    // Create a polygon big enough to hold the n vertices
    let polygon = VertexBuf.create(sides);
    // Translate the center point vertically by the
    // radius to get the first vertex.
    let vertex = Vec2.Struct.create$(0, radius);
    // Add the first vertex to the polygon
    polygon.put(vertex);
    //Create a matrix to rotate the vertex about the center point
    let rotation = Mat2d.Obj.rotate(2 * Math.PI / sides);
    //Perform the rotation and add the result to the array until it is full
    while (polygon.hasValidPosition()) {
        rotation.map(vertex, vertex);
        polygon.put(vertex);
    }
    // Return the path
    return polygon;
}

/**
 * Generates the indices for a regular polygon with n sides.
 * The polygon will have 3*(n-2) indices.
 * @param n how many sides the polygon should have.
 */
export function polygonIndices(n: number) {
    // Create an array big enough to hold all the index tuples
    let indices = IndexTuple.Buf.create(n - 2);
    // Compute indices and add to array until it is full
    let second = 1, third = 2;
    while (indices.hasValidPosition()) {
        indices.put$(0, second, third);
        second = third++
    }
    // Return the indices
    return indices;
}

/**
  * Generates the vertices for a star centered at (0,0).
  * @param points how many points the star should have.
  * @param innerRadius distance from center of star to an inner vertex.
  * @param outerRadius distance from center of start to an outer vertex.
  */
export function starVertices(points: number, innerRadius: number, outerRadius: number) {
    // Create polygon big enough to hold the n inner vertices and n outer vertices
    let polygon = VertexBuf.create(points + points);
    // Calculate the rotation angle
    let angle = 2 * Math.PI / points;
    // Create a rotation matrix
    let rotation = new Mat2d.Obj();
    // Translate the center point vertically by the
    // outer radius to get the first outer vertex.
    let outerVertex = Vec2.Struct.create$(0, outerRadius);
    // Translate the center point vertically by the inner radius
    // and rotate by half the angle to get the first inner vertex
    let innerVertex = Vec2.Struct.create$(0, innerRadius);
    rotation.setRotate(0.5 * angle);
    rotation.map(innerVertex, innerVertex);
    // Add the first outer and inner vertices to the polygon
    polygon.put(outerVertex);
    polygon.put(innerVertex);
    //Set the matrix to rotate by the full angle
    rotation.setRotate(angle);
    //Keep rotating the inner and outer vertices and
    //adding them to the array until it is full.
    while (polygon.hasValidPosition()) {
        rotation.map(outerVertex, outerVertex);
        rotation.map(innerVertex, innerVertex)
        polygon.put(outerVertex);
        polygon.put(innerVertex);
    }
    // Return the path
    return polygon;
}


/**
 * Generates the indices for a star with n points.
 * The star will have 3*(n-2) inner indices and 3n outer indices.
 * @param n how many points the star should have.
 */
export function starIndices(n: number) {
    let innerIndexCount = n - 2;
    let outerIndexCount = n;
    // Create an array big enough to hold all the indices
    let indices = IndexTuple.Buf.create(innerIndexCount + outerIndexCount);
    // Compute inner indices and add to array
    let first = 1, second = 3, third = 5;
    while (innerIndexCount--) {
        indices.put$(first, second, third);
        second = third++; third++;
    }
    // Computer outer indices and add to array
    first = 2 * n - 1; second = 0; third = 1;
    while (outerIndexCount--) {
        indices.put$(first, second, third);
        first = third++; second = third++
    }
    // Return the indices
    return indices;
}


















