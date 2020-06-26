#ifdef GL_ES
precision mediump float
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circle_shape(vec2 position, float radius) {
  return step(radius, length(position - vec2(0.5)));
}


void main() {

  vec2 position = gl_FragCoord.xy / u_resolution;

  vec2 translate = vec2(sin(u_time) / 2.0, cos(u_time) / 2.0 );

  vec3 color = vec3(0.5, 0.3, 0.5);

  position += translate * 0.5;

  float circle  = circle_shape(position, 0.1);

  color = vec3(circle);

  gl_FragColor = vec4(color, 1.0);
}
