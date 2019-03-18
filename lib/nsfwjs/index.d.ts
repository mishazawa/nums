import * as tf from '@tensorflow/tfjs';
export declare function load(base?: string): Promise<NSFWJS>;
export declare class NSFWJS {
    endpoints: string[];
    private path;
    private model;
    private intermediateModels;
    private normalizationOffset;
    constructor(base: string);
    load(): Promise<void>;
    infer(img: tf.Tensor3D | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, endpoint?: string): tf.Tensor;
    classify(img: tf.Tensor3D | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, topk?: number): Promise<Array<{
        className: string;
        probability: number;
    }>>;
}
