import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const sqliteHeaderLength = 100;
const sqliteHeaderString = "SQLite format 3\0";
const sixByteValidationString = " 0x01 0x01 0x00 0x40 0x20 0x20";
const fourByteValidationZero = "0x00000000";
const fourByteValidationOne = "0x00000001";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  errorPaper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: 'red',
  },
  sqliteHeader: {
    align: 'center',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    minWidth: '300px',
  },
});

class SqliteHeaderViewer extends React.Component {
  state = {
    file: {},
    fileByteArray: [],
    isCorrupt: false,
    corruptionReason: ""
  };

  onFileInput = event => {
    if (event.target.files.length <= 0) {
      return;
    }
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = () =>  {
      var fileByteArray = new Uint8Array(reader.result);
      this.setState({ fileByteArray: fileByteArray });
      this.checkForCorruption();
    };

    reader.readAsArrayBuffer(file);
    this.setState({file: file});
  }

  getHeaderString = () => {
    if (this.state.fileByteArray.length < sqliteHeaderLength) return "";

    var headerString = "";
    var headerStringLength = 16;
    for (var i = 0; i < headerStringLength; i++) {
      headerString += String.fromCharCode(this.state.fileByteArray[i]);
    }
    return headerString;
  }

  getPageSize = () => {
    if (this.state.fileByteArray.length < sqliteHeaderLength) return "";
    return (((this.state.fileByteArray[16] & 0xFF) << 8) | (this.state.fileByteArray[17] & 0xFF));
  }

  getSixValidationBytes = () => {
    if (this.state.fileByteArray.length < sqliteHeaderLength) return "";

    var validationBytes = "";
    for (var i = 18; i < 24; i++) {
      var hexValue = ('0' + (this.state.fileByteArray[i] & 0xFF).toString(16)).slice(-2);
      validationBytes += " 0x" + hexValue
    }
    return validationBytes;
  }

  getFourValidationBytes = (index) => {
    if (this.state.fileByteArray.length < sqliteHeaderLength) return "";

    var validationBytes = "0x";
    for (var i = index; i < index+4; i++) {
      validationBytes += ('0' + (this.state.fileByteArray[i] & 0xFF).toString(16)).slice(-2);
    }
    return validationBytes;
  }

  getFourByteInt = (index) => {
    if (this.state.fileByteArray.length < sqliteHeaderLength) return "";

    var view = new DataView(this.state.fileByteArray.buffer, index, 4);
    return view.getInt32()
  }

  validateValue = (value, rightAnswer, label) => {
    if (value !== rightAnswer) {
      this.setState({corruptionReason: "Incorrect " + label + ": " + value});
    }
    return (value !== rightAnswer);
  }

  checkForCorruption = () => {
    var isCorrupt = (
      this.validateValue(this.getHeaderString(), sqliteHeaderString, "header string")
      || this.validateValue(this.getSixValidationBytes(), sixByteValidationString, "Validation Bytes")
      || this.validateValue(this.getFourByteInt(48), 20000, "Page Cache Size")

      || this.validateValue(this.getFourValidationBytes(32), fourByteValidationZero, "Validation Bytes at index 32")
      || this.validateValue(this.getFourValidationBytes(36), fourByteValidationZero, "Validation Bytes at index 36")
      || this.validateValue(this.getFourValidationBytes(44), fourByteValidationOne, "Validation Bytes at index 44")
      || this.validateValue(this.getFourValidationBytes(52), fourByteValidationZero, "Validation Bytes at index 52")
      || this.validateValue(this.getFourValidationBytes(56), fourByteValidationOne, "Validation Bytes at index 56")
      || this.validateValue(this.getFourValidationBytes(64), fourByteValidationZero, "Validation Bytes at index 64")
    );

    this.setState({isCorrupt: isCorrupt});
  }

  render() {
    const { classes } = this.props;
    const { file, fileByteArray, isCorrupt, corruptionReason } = this.state;

    return (
      <div>
        <Typography component="div" style={{ padding: 8 * 3 }}>
          I've been learning about <Link href="http://chi.cs.uchicago.edu/chidb/fileformat.html#file-header">
          SQLite file headers </Link> through chidb.
          <br/>
          SQLite headers are 100 bytes long, and contain a few things:
            <br/>
            - A string that says "SQLite format 3"
            <br/>
            - bytewise checks
            <br/>
            - Information about the database itself (page size, schema version, ...)
          <br/>
          <br/>
          For fun I figured I'd try to make a visualizer using react. You can upload a SQLite file here
            (If you don't already have a SQLite file, you can grab one from the <Link href="https://github.com/uchicago-cs/chidb/tree/master/tests/files/databases">
            Chidb Github page</Link>)
        </Typography>
        <Typography component="div" style={{ padding: 8 * 3 }}>
          file Name: {file.name} <br/>
          file Size: {file.size} bytes<br/>
        </Typography>
        <input
          accept="*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={this.onFileInput}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span" className={classes.button}>
            Upload
          </Button>
        </label>
        <br/>
        { isCorrupt &&
          <Button center variant="contained" color="secondary" className={classes.errorPaper}>
            <Typography component="div" style={{ padding: 8 * 3 }}>
              <br/>
              Wow! This file is super corrupt!
              <br/>
              Why? {corruptionReason}
            </Typography>
          </Button>        
        }
        { (fileByteArray.length !== 0) &&
          <div className={classes.root}>
            <Grid container spacing={24} className={classes.container} center>
              <Grid item xs={12} sm={12}>
                <Paper className={classes.paper}>Title:<br/>{this.getHeaderString()}</Paper>
              </Grid>

              <Grid item xs={2} sm={2}>
                <Paper className={classes.paper}>Page Size:<br/>{this.getPageSize()}</Paper>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Paper className={classes.paper}>Validation Bytes:<br/>{this.getSixValidationBytes()}</Paper>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Paper className={classes.paper}>File Change Counter:<br/>{this.getFourByteInt(24)}</Paper>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Paper className={classes.paper}>Not used<br/>:)</Paper>
              </Grid>

              <Grid item xs={3} sm={3}>
                <Paper className={classes.paper}>Validation Bytes:<br/>{this.getFourValidationBytes(32)}</Paper>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Paper className={classes.paper}>Validation Bytes:<br/>{this.getFourValidationBytes(36)}</Paper>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Paper className={classes.paper}>Schema Version:<br/>{this.getFourByteInt(40)}</Paper>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Paper className={classes.paper}>Validation Bytes:<br/>{this.getFourValidationBytes(44)}</Paper>
              </Grid>

              <Grid item xs={3} sm={3}>
                <Paper className={classes.paper}>Page Cache Size:<br/>{this.getFourByteInt(48)}</Paper>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Paper className={classes.paper}>Validation Bytes:<br/>{this.getFourValidationBytes(52)}</Paper>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Paper className={classes.paper}>Validation Bytes:<br/>{this.getFourValidationBytes(56)}</Paper>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Paper className={classes.paper}>User Cookie:<br/>{this.getFourByteInt(60)}</Paper>
              </Grid>

              <Grid item xs={3} sm={3}>
                <Paper className={classes.paper}>Validation Bytes:<br/>{this.getFourValidationBytes(64)}</Paper>
              </Grid>

            </Grid>
          </div>
        }
      </div>
    );
  }
}

SqliteHeaderViewer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SqliteHeaderViewer);