/**
 * Scale to fit options for a rect-to-rect matrix transformation.
 */
const enum ScaleToFit {
    /**
     * Stretches the src rect to fit inside dst, then translates src.center() to dst.center().
     */
    Center,
    /**
     * Stretches the src rect to fit inside dst, then translates src.bottomRight() to dst.bottomRight().
     */
    End,
    /**
     * Scales the src rect to fit inside dst exactly, then translates src to dst.
     */
    Fill,
    /**
     * Stretches the src rect to fit inside dst, then translates src.topLeft() to dst.topLeft().
     */
    Start
};

export default ScaleToFit;
