#ifdef GL_ES
precision mediump float
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circle_shape(vec2 position, float radius, float scale) {
  position = 2.0 * position - 1.0;
  return step(radius * scale, length(position));
}

float scale_value(float time, float min, float max) {
  return (max - min) * abs(sin(time)) + min;
}

void main() {

  vec2 position = gl_FragCoord.xy / u_resolution;

  float scale = scale_value(u_time, 0.5, 2.0);

  vec3 circle = vec3(circle_shape(position, 0.3, scale));

  gl_FragColor = vec4(circle, 1.0);

}
