import * as Color from './struct/color'
import * as Rect from './struct/rect'

export type bit = 0 | 1;

/**
 * Array of bits backed by an array buffer.
 */
export class BitArray {

    /**
     * Byte view of the backing data for this array.
     */
    public data: Uint8Array;

    /**
     * The number of bits in this array. Fixed at construction and thus readonly.
     */
    public length: number;

    /**
     * Creates a bit array backed by the specified array buffer.
     * @param buffer the backing data for the array.
     */
    constructor(buffer: ArrayBuffer) {
        this.data = new Uint8Array(buffer);
        this.length = buffer.byteLength << 3; // or * 8
    }

    /**
     * Gets the bit at the specified index of this array.
     * @param index The index of the bit in this array.
     */
    get(index: number): bit {
        // Ex: index = 0b10011 (20th bit)
        let byteIndex = index >> 3;              // 0b10 (2) -> third byte
        let bitShift = index & 0b111;            // 0b11 (3) -> fourth bit
        let byte = this.data[byteIndex];         // Assume byte = 0b10101
        return <bit> ((byte >> bitShift) & 0b1); // Then fourth bit = 0
    }

    /**
     * Sets the bit at the specified index of this array (to one).
     * @param index The index of the bit to set.
     */
    set(index: number) {
        // Ex: index = byte3 = 0b10011 (20th bit)
        let byteIndex = index >> 3;            // 0b10 (2) -> third byte
        let bitShift = index & 0b111;          // 0b11 (3) -> fourth bit
        this.data[byteIndex] |= (1 << bitShift); // 0b11011
    }

    /**
     * Clears the bit at the specified index of this array (to zero).
     * @param index The index of the bit to clear.
     */
    clear(index: number) {
        // Ex: index = byte3 = 0b10011 (20th bit)
        let byteIndex = index >> 3;               // 0b10 (2) -> third byte
        let bitShift = index & 0b111;             // 0b11 (3) -> fourth bit
        this.data[byteIndex] &= ~(1 << bitShift); // 0b10011
    }

    /**
     * Invokes the callback on each of the bits in this array.
     * @param callback The callback to invoke.
     */
    forEach(callback: (bit: bit) => void) {
        for (let i = 0; i < this.data.length; i++) {
            let byte = this.data[i];
            for (let j = 0; j < 8; j++) {
                callback(<bit>((byte >> j) & 0b1));
            }
        }
    }

    /**
     * Converts this bit array to a string of ones and zeros.
     */
    toString() {
        let str = "";
        this.forEach((bit) => {
            str += bit;
        });
        return str;
    }
}

export class BinaryImage {

    /**
     * The bit array backing this image.
     */
    readonly data: BitArray;

    /**
     * The color referenced by the '1's in the bit array.
     */
    readonly color: Color.Struct;

    /**
     * The bounded area where all the '1's in this image reside.
     */
    readonly bounds: Rect.Obj;

    constructor(data: BitArray, bounds: Rect.Obj, color: Color.Struct) {
        this.data = data;
        this.color = color;
        this.bounds = bounds;
    }

    static make(data: BitArray, width: number, height: number, color: Color.Struct) {
        // Find smallest rect containing all the '1's in the backing array
        let bounds: Rect.Obj;
        for (let y = 0, i = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (data.get(i++)) { // Nonzero
                    if (bounds) {
                        bounds.unionPoint$(x, y);
                    } else {
                        bounds = Rect.Obj.ltrb(x, y, x, y);
                    }
                }
            }
        }

        // Return null if image consists entirely of zeros
        if (!bounds) return null

        // Get number of colums and rows in bounded area
        let cols = Rect.width(bounds) + 1, rows = Rect.height(bounds) + 1;

        // Make bit array enough to hold data from the bounded area
        let dst = createBitArray(cols * rows);

        // Copy bit data into dst
        for (let y = bounds.bottom, i = 0; y <= bounds.top; y++) {
            for (let x = bounds.left; x <= bounds.right; x++ , i++) {
                if (data.get(y * width + x)) {
                    dst.set(i);
                }
            }
        }

        // Pass compressed data to new instance and return
        return new BinaryImage(dst, bounds, color);
    }

    /**
     * Invokes the specified callback on the index of each of the set bits in this array.
     * @param callback the callback to invoke.
     */
    forEachSetBit(dstWidth: number, callback: (index: number) => void) {
        let x = this.bounds.left,
            base = this.bounds.bottom * dstWidth;
        // For each of the bits in the array
        this.data.forEach((bit) => {
            // If the bit is set
            if (bit) {
                // Send bit index
                callback(base + x)
            }
            // Update x position and base index
            if (++x > this.bounds.right) {
                x = this.bounds.left;
                base += dstWidth;
            }
        })
    }

}

/**
 * Creates an array with the specified bit capacity, rounded up to the nearest multiple of 8.
 */
export function createBitArray(capacity: number) {
    let byteCount = capacity >> 3;     // Divide by 8 
    if (capacity & 0b111) byteCount++; // Round up
    return new BitArray(new ArrayBuffer(byteCount)); 
}  





