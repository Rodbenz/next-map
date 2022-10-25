
import { LineString, Point } from "ol/geom";
import MultiPoint from "ol/geom/MultiPoint";
import { getArea, getLength } from "ol/sphere";
import { Fill, RegularShape, Stroke, Text, Style } from "ol/style";
import CircleStyle from "ol/style/Circle";
import { numberWithCommas } from "./outputControl";

let tip = "คลิกลงบนแผนที่เพื่อวาด Polygon\n ดับเบิ้ลคลิกเพื่อสิ้นสุดการวาด"


const style = new Style({
    fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        // lineDash: [10, 10],
        width: 2,
    }),
    image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.7)',
        }),
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
        }),
    }),
});

const labelStyle = new Style({
    text: new Text({
        font: '14px Calibri,sans-serif',
        fill: new Fill({
            color: 'rgba(255, 255, 255, 1)',
        }),
        backgroundFill: new Fill({
            color: 'rgba(0, 0, 0, 0.7)',
        }),
        padding: [3, 3, 3, 3],
        textBaseline: 'bottom',
        offsetY: -15,
    }),
    image: new RegularShape({
        radius: 8,
        points: 3,
        angle: Math.PI,
        displacement: [0, 10],
        fill: new Fill({
            color: 'rgba(0, 0, 0, 0.7)',
        }),
    }),
});

const tipStyle = new Style({
    text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
            color: 'rgba(255, 255, 255, 1)',
        }),
        backgroundFill: new Fill({
            color: 'rgba(0, 0, 0, 0.4)',
        }),
        padding: [2, 2, 2, 2],
        textAlign: 'left',
        offsetX: 15,
    }),
});


let tipPoint;
const segmentStyle = new Style({
    text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
            color: 'rgba(255, 255, 255, 1)',
        }),
        backgroundFill: new Fill({
            color: 'rgba(0, 0, 0, 0.4)',
        }),
        padding: [2, 2, 2, 2],
        textBaseline: 'bottom',
        offsetY: -12,
    }),
    image: new RegularShape({
        radius: 6,
        points: 3,
        angle: Math.PI,
        displacement: [0, 8],
        fill: new Fill({
            color: 'rgba(0, 0, 0, 0.4)',
        }),
    }),
});

const segmentStyles = [segmentStyle];

// let pointStyle = (f)=>{
//     let feature = f
//     new Style({
//         image: new CircleStyle({
//           radius: 5,
//           fill: new Fill({
//             color: 'orange',
//           }),
//         }),
//         geometry: function (feature) {
//           // return the coordinates of the first ring of the polygon
//           const coordinates = feature.getGeometry().getCoordinates()[0];
//           return new MultiPoint(coordinates);
//         },
//       }),
// }


export function styleFunction(feature, segments = true, drawType, tip) {
    const styles = [style];
    const geometry = feature.getGeometry();
    const type = geometry.getType();
    let point, label, line;
    if (!drawType || drawType === type) {
        if (type === 'Polygon') {
            point = geometry.getInteriorPoint();
            label = formatArea(geometry);
            line = new LineString(geometry.getCoordinates()[0]);
        } else if (type === 'LineString') {
            point = new Point(geometry.getLastCoordinate());
            label = formatLength(geometry);
            line = geometry;
        }
    }
    if (segments && line) {
        let count = 0;
        line.forEachSegment(function (a, b) {
            const segment = new LineString([a, b]);
            const label = formatLength(segment);
            if (segmentStyles.length - 1 < count) {
                segmentStyles.push(segmentStyle.clone());
            }
            const segmentPoint = new Point(segment.getCoordinateAt(0.5));
            segmentStyles[count].setGeometry(segmentPoint);
            segmentStyles[count].getText().setText(label);
            styles.push(segmentStyles[count]);
            count++;
        });
    }
    if (label) {
        labelStyle.setGeometry(point);
        labelStyle.getText().setText(label);
        styles.push(labelStyle);
        styles.push(new Style({
            image: new CircleStyle({
                radius: 5,
                fill: new Fill({
                    color: 'orange',
                }),
            }),
            geometry: function (feature) {
                // return the coordinates of the first ring of the polygon
                const coordinates = feature.getGeometry().getCoordinates()[0];
                return new MultiPoint(coordinates);
            },
        }));
    }

    if (
        tip &&
        type === 'Point'
    ) {
        tipPoint = geometry;
        tipStyle.getText().setText(tip);
        styles.push(tipStyle);
    }
    return styles;
}





const formatLength = function (line) {
    const length = getLength(line, { projection: "EPSG:4326" });
    let output;
    output = numberWithCommas(Math.round(length * 100) / 100) + ' ม.'
    // if (length > 100) {
    //     output = Math.round((length / 1000) * 100) / 100 + ' km';
    // } else {
    //     output = Math.round(length * 100) / 100 + ' m';
    // }
    return output;
};

const formatArea = function (polygon) {
    const area = getArea(polygon, { projection: "EPSG:4326" });
    let output;
    output = numberWithCommas(Math.round(area * 100) / 100) + ' ม\xB2';

    return output;
};