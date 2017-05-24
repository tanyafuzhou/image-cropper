import React, { PureComponent } from "react";
import {
  Form,
  FormControl,
  Input,
  Image,
  Button,
  Grid,
  Card,
  Icon
} from "rctui";
import Cropper from "react-image-cropper/component/Cropper";
import Upload from "demo/components/Upload";
import Base64Binary from "demo/utils/base64-binary";
import { saveAs } from "file-saver";
import "demo/styles/fonts.less";

class Crop extends PureComponent {
  constructor() {
    super();
    this.state = {
      image: "./images/image.png",
      form: {
        width: 200,
        height: 200,
        originX: 0,
        originY: 0
      },
      ratio: 1,
      img: {
        width: 600,
        height: 336
      },
      cropped: {
        width: 200,
        height: 200
      },
      croppedImg: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCrop = this.handleCrop.bind(this);
    this.handleCropperChange = this.handleCropperChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
  }
  handleChange(data) {
    this.setState(
      {
        form: {
          originX: Number(data.originX),
          originY: Number(data.originY),
          width: Number(data.width),
          height: Number(data.height)
        }
      },
      this.handleCrop
    );
  }
  handleCropperChange(data) {
    console.log("cropper", data);
    this.setState(
      {
        form: {
          originX: Number(data.x),
          originY: Number(data.y),
          width: Number(data.width),
          height: Number(data.height)
        }
      },
      this.handleCrop
    );
  }
  handleCrop() {
    const cropped = this.refs.cropper.values();

    this.setState({
      croppedImg: this.refs.cropper.crop(),
      cropped: {
        width: cropped.width,
        height: cropped.height
      }
    });
  }
  handleUpload(files) {
    const file = files[0];
    this.setState(
      {
        image: file.thumb,
        img: {
          width: file.width,
          height: file.height
        }
      },
      this.handleCrop
    );
  }
  handleDownload() {
    this.handleCrop();
    let data = this.refs.cropper.crop();
    const blob = new Blob(
      [Base64Binary.decode(data.match(/^data.*base64,(.*)$/)[1])],
      {
        type: "image/png;"
      }
    );
    saveAs(blob, "cropped image.png");
  }
  handleZoomIn() {
    console.log("zoom in");
    const { ratio } = this.state;
    this.setState(
      {
        ratio: ratio * 2
      },
      this.handleCrop
    );
  }
  handleZoomOut() {
    const { ratio } = this.state;
    this.setState(
      {
        ratio: ratio / 2
      },
      this.handleCrop
    );
  }
  renderCropped(croppedImg) {
    return (
      <div
        style={{
          backgroundImage: "linear-gradient(to top right, #efefef 25%, transparent 25%, transparent 75%, #efefef 75%, #efefef),linear-gradient(to top right, #efefef 25%, transparent 25%, transparent 75%, #efefef 75%, #efefef)",
          backgroundSize: "21px 21px",
          backgroundPosition: "0 0,10px 10px",
          width: 200,
          height: 200,
          margin: "auto",
          borderRadius: "2px",
          border: "1px solid #ddd",
          position: "relative"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 2,
            left: 2,
            right: 2,
            bottom: 2,
            backgroundImage: `url(${croppedImg})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        />
      </div>
    );
  }
  render() {
    const { form, croppedImg, img, ratio, cropped } = this.state;
    const imgWidth = img.width * ratio;
    const imgHeight = img.height * ratio;
    console.log(
      "img",
      croppedImg,
      img.width,
      img.height,
      imgWidth,
      imgHeight,
      ratio,
      imgWidth === NaN,
      imgWidth === "NaN"
    );
    return (
      <Grid style={{ padding: 20, backgroundColor: "#f4f4f4" }} width={1}>
        <div style={{ textAlign: "center", paddingBottom: 20 }}>
          <Upload onChange={this.handleUpload} multiple={false}>
            Upload Image
          </Upload>
        </div>
        <Form
          data={form}
          onChange={this.handleChange}
          style={{ paddingTop: "20px" }}
          layout="inline"
        >
          <FormControl label="crop size:" labelWidth="100px">
            <Input
              type="number"
              name="width"
              placeholder="width"
              defaultValue={200}
              style={{ width: 120 }}
            />
            <span style={{ margin: "0 10px" }}>x</span>
            <Input
              type="number"
              name="height"
              placeholder="height"
              defaultValue={200}
              style={{ width: 120 }}
            />
          </FormControl>
          <FormControl label="crop position:" labelWidth="150px">
            <Input
              style={{ width: 120 }}
              type="number"
              name="originX"
              placeholder="X"
              defaultValue={0}
            />
            <span style={{ margin: "0 10px" }}>x</span>
            <Input
              style={{ width: 120 }}
              type="number"
              name="originY"
              placeholder="Y"
              defaultValue={0}
            />
          </FormControl>

        </Form>
        <Grid
          width={700 / 1000}
          style={{
            backgroundColor: "#fff",
            padding: 20,
            boxShadow: "0 1px 2px rgba(0,0,0,0.07)"
          }}
        >
          <div style={{ textAlign: "right" }}>
            <span style={{ marginRight: 20 }}>{imgWidth}*{imgHeight}</span>
            <a onClick={this.handleZoomIn} href="javascript:void();">
              <Icon icon="search-plus" style={{ marginRight: 20 }} />
            </a>
            <a onClick={this.handleZoomOut} href="javascript:void();">
              <Icon icon="search-minus" />
            </a>
          </div>
          <div
            style={{
              overflow: "auto",
              backgroundImage: "linear-gradient(to top right, #efefef 25%, transparent 25%, transparent 75%, #efefef 75%, #efefef),linear-gradient(to top right, #efefef 25%, transparent 25%, transparent 75%, #efefef 75%, #efefef)",
              backgroundSize: "21px 21px",
              backgroundPosition: "0 0,10px 10px",
              maxHeight: 400
            }}
          >
            <div
              style={{
                width: imgWidth !== imgWidth ? "auto" : imgWidth,
                height: imgHeight !== imgHeight ? "auto" : imgHeight,
                margin: "auto"
              }}
            >
              <Cropper
                key={`${this.state.image}-${imgWidth}-${imgHeight}`}
                src={this.state.image}
                ref="cropper"
                originX={form.originX}
                originY={form.originY}
                width={form.width}
                height={form.height}
                fixedRatio={false}
                onChange={this.handleCropperChange}
              />
            </div>
          </div>
        </Grid>
        <Grid width={270 / 1000} offset={30 / 1000}>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "50px 20px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.07)"
            }}
          >
            {this.renderCropped(croppedImg)}
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <p>{cropped.width}*{cropped.height}</p>
              <Button
                onClick={this.handleDownload}
                style={{
                  backgroundColor: "#F289a6",
                  color: "#fff",
                  borderColor: "#F289a6"
                }}
              >
                Download
              </Button>
            </div>
          </div>
        </Grid>

      </Grid>
    );
  }
}
export default Crop;
