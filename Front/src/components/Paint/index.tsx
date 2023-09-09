import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/layout';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/slider';
import { Tooltip } from '@chakra-ui/tooltip';
import { HexColorPicker } from 'react-colorful';

type PaintProps = {
    width: number
    height: number
};

type MouseHandler = React.MouseEventHandler<HTMLCanvasElement>;

function isCanvasElement(ref: any): ref is React.RefObject<HTMLCanvasElement> {
    return Boolean(ref) && Boolean(ref.current) && ref.current.tagName === 'CANVAS';
}

const Paint = React.forwardRef<HTMLCanvasElement, PaintProps>((props, ref) => {
    const { width, height } = props;

    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineWidth, setLineWidth] = useState(5);
    const [lineColor, setLineColor] = useState("#000000");

    const onSliderChange = useCallback((value: number) => {
        setLineWidth(value);
    }, []);

    const startDrawing: MouseHandler = useCallback((e) => {
        if (!ctxRef.current) {
            return;
        }

        ctxRef.current.beginPath();
        ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
    }, []);

    const endDrawing: MouseHandler = useCallback(() => {
        if (!ctxRef.current) {
            return;
        }

        ctxRef.current.closePath();
        setIsDrawing(false);
    }, []);
  
    const draw: MouseHandler = useCallback((e) => {
        if (!isDrawing || !ctxRef.current) {
            return;
        }

        ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctxRef.current.stroke();
    }, [isDrawing]);

    useEffect(() => {
        if (!isCanvasElement(ref)) {
            return;
        }

        const ctx = ref.current?.getContext('2d');

        if (!ctx) {
            return;
        }

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;

        if (!ctxRef.current) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);
        }

        ctxRef.current = ctx;
    }, [lineColor, lineWidth, width, height]);

    return <Box
        display="flex"
    >
        <Box
            borderWidth={4}
            borderColor="black"
            borderRadius="2xl"
            overflow="hidden"
            boxSizing="border-box"
        >
            <canvas
                ref={ref}
                width={width}
                height={height}
                onMouseDown={startDrawing}
                onMouseUp={endDrawing}
                onMouseMove={draw}
            />
        </Box>
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            w="64"
            ml="16"
        >
            <HexColorPicker color={lineColor} onChange={setLineColor} style={{ width: '100%' }} />
            <Slider mt="16" min={1} max={20} value={lineWidth} onChange={onSliderChange}>
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <Tooltip hasArrow label={lineWidth} placement="top" isOpen bgColor="blue.600">
                    <SliderThumb borderColor="black" />
                </Tooltip>
            </Slider>
        </Box>
    </Box>
});

export default Paint;
