#ifdef GL_ES
precision mediump float
#endif

uniform vec2 u_resolution;

float circle_shape(vec2 position, float radius) {
  return step(radius, length(position - vec2(0.5)));
}

float rect_shape(vec2 position, vec2 center, vec2 size) {
  vec2 s = center - (size * 0.5);
  vec2 e = center + (size * 0.5);
  return step(s.x, position.x) * (1.0 - step(e.x, position.x)) *
         step(s.y, position.y) * (1.0 - step(e.y, position.y));
}


void main() {

  vec2 position = gl_FragCoord.xy / u_resolution;

  vec2 center = vec2(0.6, 0.7);
  vec2 size = vec2(0.3, 0.25);

  // float circle  = circle_shape(position, 0.3);
  float rect = rect_shape(position, center, size);

  // gl_FragColor = vec4(vec3(circle), 1.0);
  gl_FragColor = vec4(vec3(rect), 1.0);

}
