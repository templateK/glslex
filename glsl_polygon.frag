#ifdef GL_ES
precision mediump float;
#endif

const float PI = 3.1415926535;

uniform vec2 u_resolution;

float polygon_shape(vec2 position, float radius, float sides) {

  position = position * 2.0 - 1.0;
  float angle = atan(position.x, position.y);
  float slice = PI * 2.0 / sides;

  // floor(0.5 + angle / slice) * slice - angle
  // Projects the length between the current position and the origin into nearest axis.
  // angle2_nearest_axis oscillates between -29.999 to 30.0 degree. if the slice is 60.0 degree.
  float angle2_nearest_axis = (floor(0.5 + angle / slice) * slice - angle);
  float projected_length = cos(angle2_nearest_axis) * length(position);

  if ( angle2_nearest_axis < 0.0 && abs(angle2_nearest_axis) < slice * 0.5) {
    if ( projected_length < radius) {
      return abs(angle2_nearest_axis) / (slice * 0.5);
    } else {
      return 1.0;
    }
  }
  else {
    return step(radius, projected_length);
  }
}



void main() {

  vec2 position = gl_FragCoord.xy / u_resolution;

  vec3 color = vec3(0.5);

  float polygon = polygon_shape(position, 0.6, 6.0);

  color = vec3(polygon);

  gl_FragColor = vec4(color, 1.0);
}
