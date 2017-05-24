import React, { PureComponent } from "react";
import { Button } from "rctui";

class Upload extends PureComponent {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    event.preventDefault();
    var target = event.target;
    var files = target.files;
    var count = this.props.multiple ? files.length : 1;
    // convert to array
    files = Array.prototype.slice.call(files, 0);
    files = files.filter(function(file) {
      return /image/i.test(file.type);
    });
    for (let i = 0; i < count; i++) {
      const thumb = URL.createObjectURL(files[i]);
      files[i].thumb = thumb;
      const img = new Image();
      img.onload = () => {
        files[i].width = img.width;
        files[i].height = img.height;
        if (i + 1 === count) {
          this.props.onChange(files);
        }
      };
      img.src = thumb;
      // convert base64
      // const FR = new FileReader();
      // FR.addEventListener("load", e => {
      //   files[i]["base64"] = e.target.result;
      //   if (i + 1 === count) {
      //     this.props.onChange(files, event);
      //   }
      // });
      // FR.readAsDataURL(files[i]);
    }
    // this.props.onChange(files);
  }

  render() {
    return (
      <Button
        href="javascript:void(0);"
        status="info"
        size="large"
        style={{
          position: "relative",
          ...this.props.style
        }}
      >
        <input
          type="file"
          multiple={this.props.multiple}
          ref="fileInput"
          onChange={this.handleChange}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            opacity: "0",
            width: "100%",
            cursor: "pointer"
          }}
        />
        {this.props.children}
      </Button>
    );
  }
}
Upload.defaultProps = {
  multiple: true
};
Upload.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  multiple: React.PropTypes.bool
};

export default Upload;
