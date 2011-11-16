function Point( x, y ) { this.X = x; this.Y = y; }
Point.prototype.Equals = function ( p ) { return this.X == p.X && this.Y == p.Y; }
Point.prototype.toString = function () { return "(" + this.X + "," + this.Y + ")"; }

function Line( from, to ) { this.From = from; this.To = to; }
Line.prototype.Equals = function ( l ) { return this.From.Equals( l.From ) && this.To.Equals( l.To ); }
Line.prototype.toString = function () { return "[" + this.From.toString() + "," + this.To.toString() + "]"; }

function Drawing( line, color, width, videoTimeStart, videoTimeFinish ) { this.Line = line; this.Color = color; this.Width = width; this.VideoTimeStart = videoTimeStart; this.VideoTimeFinish = videoTimeFinish; }
Drawing.prototype.Equals = function ( d ) { return this.Line.Equals( d.Line ) && this.Color == d.Color && this.Width == d.Width && this.VideoTimeStart == d.VideoTimeStart && this.VideoTimeFinish == d.VideoTimeFinish; }
Drawing.prototype.toString = function () { return "{" + this.Line.toString() + "," + this.Color + "," + this.Width + "," + this.VideoTimeStart + "," + this.VideoTimeFinish + "}"; }