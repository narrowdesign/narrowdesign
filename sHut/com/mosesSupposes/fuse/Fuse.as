
import mx.utils.Delegate;
import mx.events.EventDispatcher;

import com.mosesSupposes.fuse.FuseItem;
import com.mosesSupposes.fuse.FuseKitCommon;

/**
*
* Fuse Kit 2
* Copyright (c) 2006 Moses Gunesch, MosesSupposes.com
* 
* Distributed under MIT Open Source License, see Fuse-Kit-License.html (in fuse package directory)
* Easing Equations (c) 2003 Robert Penner used by permission, see PennerEasing
* Visit http://www.mosessupposes.com/Fuse
* 
* @ignore
*
* Event & animation sequencer that extends Array.
* <br><br>
* @usage
* To enable animation sequencing, pass Fuse to {@link com.mosesSupposes.fuse.ZigoEngine#register} or {@link com.mosesSupposes.fuse.ZigoEngine#simpleSetup}.
* <br><br>
* Events dispatched:
* <ul><li><code>onStart</code></li><li><code>onStop</code></li><li><code>onPause</code></li><li><code>onResume</code></li><li><code>onAdvance</code></code></li><li><code>onComplete</code></li></ul>
* <br>Unlike ZigoEngine which uses AsBroadcaster, Fuse uses the mx EventDispatcher standard.
* <pre>var f:Fuse = new Fuse();
* f.addEventListener("onComplete", myListenerObj);</pre>
* <br>
* The Fuse utility is comprised of:
* <ul>
* <li>Class & instance default settings</li>
* <li>Array methods (see {@link #push})</li>
* <li>Play-control methods (see {@link #start})</li>
* <li>Simple Syntax static methods (see {@link #open})</li>
* <li>A runtime Object Syntax interpreter (see {@link #Fuse})</li>
* <li>Instance management methods (see {@link #getInstance})</li>
* </ul>
* <br>
* Fuse Object Syntax parameters are documented under the {@link #Fuse} constructor.<br>
* <br>
* Fuse Simple Syntax parameters are documented under Fuse.{@link #open}.
* 
* @author	Moses Gunesch / MosesSupposes.com
* @version	2.1.3r1
*/
class com.mosesSupposes.fuse.Fuse extends Array {
	
	/**
	 * @exclude
	 * Unique identifier used by ZigoEngine.register
	 */ 
	public static var registryKey:String = 'fuse';
	
	/**
	 * Class default: Enables kit version to be retrieved at runtime or when reviewing a decompiled swf. 
	 * @usage <pre>trace(Fuse.VERSION); // if the version is incorrect, clear your ASO cache.</pre>
	 */
	public static var VERSION:String = FuseKitCommon.VERSION;
	
	/**
	* Class default: Controls how much feedback Fuse outputs, helpful for debugging.
	* @usage <pre>// once only
	* Fuse.OUTPUT_LEVEL = 3;</pre>
	* <ul>
	* <li>0 = no traces,</li> 
	* <li>1 = normal errors & warnings</li>
	* <li>2 = additional Fuse output</li>
	* <li>3 = additional FuseItem output</li>
	* </ul>
	*/
	public static var OUTPUT_LEVEL:Number = 1;
	
	/**
	 * Class default: whether Fuse instances are automatically destroyed after playing once unless otherwise specified by instance-level {@link #autoClear}.
	 * @usage <pre>// once only
	* Fuse.AUTOCLEAR = true;
	* 
	* // later this can be overridden in any instance
	* var f:Fuse = new Fuse();
	* f.autoClear = false;</pre>
	* When a Fuse is set to auto-remove itself it is best practice to not set a variable reference to that Fuse, which may cause memory buffering, or to delete the variable when the Fuse is complete.<br><br>
	 * To override this default on a per-Fuse basis set the instance's {@link #autoClear} property.
	 * @see #autoClear
	 */ 
	public static var AUTOCLEAR:Boolean = false; 
	
	/**
	 * Class default: whether Fuse instances stop when a tween is interrupted, or is destroyed if {@link #autoClear} is turned on, unless otherwise specified by instance-level {@link #autoStop}.
	 * @usage <pre>// once only
	 * Fuse.AUTOSTOP = false;</pre>
	 * If this default is set false, Fuses will skip past any externally interrupted tweens and continue to play through. 
	 * When Fuses are used in interactive devices like rollover states, it is best to leave this setting true to avoid conflicts between Fuse instances controlling the same behavior.<br><br>
	 * Note that an interruption will not occur if new non-overlapping tweens are started on a clip that a Fuse is tweening. 
	 * To enforce interruptions in such cases you can set ZigoEngine.{@link com.mosesSupposes.ZigoEngine#AUTOSTOP} to true, 
	 * which causes all tweening properties in a clip to stop when a new tween is removed, or use ZigoEngine.{@link com.mosesSupposes.ZigoEngine#removeTween} prior to the call that may interrupt a Fuse.
	 * <br><br>To override this default on a per-Fuse basis set the instance's {@link #autoStop} property.
	 * @see #autoStop
	 * @see #autoClear
	 * @see #AUTOCLEAR
	 */ 
	public static var AUTOSTOP:Boolean = true; 
	
	/**
	 * Instance default: Convenience, allows you to name any Fuse.
	 * @usage <pre>var drawContentPage:Fuse = new Fuse();
	 * drawContentPage.label = "drawContentPage";</pre>
	 * @description	The Fuse label is used in output messages, and can be used to reference a Fuse instance in {@link #getInstance}, {@link #fastForward} and Simple Syntax methods {@link #open} and {@link #openGroup}.
	 * @see #id
	 * @see #getInstance
	 * @see #open
	 * @see #openGroup
	 */
	public var label:String; 
	
	/**
	 * Instance default: Fuse instance is automatically destroyed after playing once.
	 * @usage
	 * <pre>var f:Fuse = new Fuse();
	 * f.autoClear = true;</pre>
	 * In this example, the fuse instance f will delete itself after it plays through once, at which time you should also delete the variable <code>f</code> to prevent memory buffering issues.
	 * @see #AUTOCLEAR
	 */ 
	public var autoClear:Boolean; 

	/**
	 * Instance default: Fuse instance stops when any of its running tweens are interrupted, or is destroyed if {@link #autoClear} is turned on.
	 * @usage This instance-level setting overrides the default setting Fuse.{@link #AUTOSTOP}. If false an interrupted Fuse will recover and continue to play through.
	 * <pre>var f:Fuse = new Fuse();
	 * f.autoStop = false; //override the default setting for this Fuse instance</pre>
	 * @see #AUTOSTOP
	 * @see #autoClear
	 * @see #AUTOCLEAR
	 */ 
	public var autoStop:Boolean;
	
	/**
	 * Instance default: scope for all functions run from a Fuse if left unspecified within the action.
	 * @usage
	 * <pre>var f:Fuse = new Fuse();
	 * f.scope = this;
	 * f.push({target:menu, 
	 * 	start_alpha:0,
	 * 	x:getMenuX,
	 * 	y:getMenuY, 
	 * 	startfunc:"setupMenu", 
	 * 	updfunc:"onMenuFadeUpdate", 
	 * 	func:"onMenuShown"
	 * });
	 * f.push({ scope:contentArea,
	 * 	func:"drawContent"
	 * });</pre>
	 * In this example, all the functions in the first action, including the runtime-evaluation calls to supposed getMenuX and getMenuY methods will be 
	 * auto-scoped to the Fuse's default scope (this). In the second action, drawContent is specifically scoped to the contentArea object, overriding the default.
	 * It's most useful to set a default scope when there will be many function calls within the sequence, to save you from specifically scoping each action.
	 * @see #Fuse
	 */ 
	public var scope:Object;
	
	/**
	 * Instance default: duration value in seconds for any action that does not specify one.
	 * @usage This setting supercedes the default {@link com.mosesSupposes.fuse.ZigoEngine#DURATION} only for the 
	 * Fuse instance it is set on, and is overrided by any action containing its own <code>seconds</code>, 
	 * <code>duration</code>, or <code>time</code> parameter.
	 * <pre>var f:Fuse = new Fuse();
	 * f.duration = 2;
	 * f.push({ x:'100' }); // adopts new default
	 * f.push({ y:'100', time:.5 }); // overrides default</pre>
	 * @see #ease
	 * @see com.mosesSupposes.fuse.ZigoEngine#DURATION
	 */ 
	public var duration:Number;
	
	/**
	 * Instance default: easing value for any action that does not specify one.
	 * @usage This setting supercedes the default {@link com.mosesSupposes.fuse.ZigoEngine#EASING} only for the 
	 * Fuse instance it is set on, and is overrided by any action containing its own <code>ease</code> or 
	 * <code>easing</code> parameter.
	 * <pre>var f:Fuse = new Fuse();
	 * f.easing = "easeInOutCubic";
	 * f.push({ x:'100' }); // adopts new default
	 * f.push({ y:'100', ease:'easeInExpo' }); // overrides default</pre>
	 * @see #duration
	 * @see com.mosesSupposes.fuse.ZigoEngine#EASING
	 */ 
	public var easing:Object;
	
	/**
	 * Internal id based on instance count. 
	 */
	private var _nID:Number;
	
	/**
	 * Internal sequence play-index. 
	 */
	private var _nIndex:Number;
	
	/**
	 * Internal, can be -1 ("stopped"), 1 ("playing"), or 0 ("paused").
	 */
	private var _nState:Number = -1;
	
	/**
	 * Internal list of instance's default animation targets, set using public setter target or addTarget method.
	 */ 
	private var _aDefaultTargs:Array;
	
	/** 
	 * Internal setInterval id for delays run by Fuse. (Delays in groups or with tweens are handled by FuseItem.)
	 */
	private var _nDelay:Number = -1;
	
	/**
	 * Internal storage used for tracking a delay's current time during pause().
	 */ 
	private var _nTimeCache:Number = -1;
	
	/**
	 * Stores a Delegate function used to trap nested Fuse's onComplete event (stored for later removal during destroy()).
	 */ 
	private var _oDel1:Object;
	
	/**
	 * Static list of all Fuse instances created, publicly accessible via getInstance() and getInstances() and used by remote methods like open().
	 */ 
	private static var _aInstances:Array = null;
	
	/**
	 * Internal storage of Build Mode (Simple Syntax) params curID:Number (often queried to find out if Build Mode is active), prevID:Number, curGroup:Array.
	 */ 
	private static var _oBuildMode:Object = null;
	
	/**
	 * Written in during EventDispatcher.initialize().
	 */ 
	private var dispatchEvent:Function;
	
	/**
	* Fuse extends Array to enable sequence-building & management using familiar methods like <code>push()</code>.
	* @param fuseAction		One or more generic "action" objects or arrays in Fuse Object Syntax constituting a sequence.
	* @usage
	* <pre>
	* <span style="color:#999999">// setup - once per FLA only</span>
	* import com.mosesSupposes.fuse.*;
	* ZigoEngine.register( Fuse, PennerEasing );
	* 
	* <span style="color:#999999">// build a short intro sequence to apply to box1_mc.</span>
	* var f:Fuse = new Fuse();
	* f.label = "swoopyIntro";
	* f.target = box1_mc;
	* 
	* f.push({ delay: .25 });
	* 
	* <span style="color:#999999">// labels can be used in some methods but are mostly a convenience.</span>
	* f.push({ label: "appear",
	*          start_scale: 500,
	*          start_alpha: 0,
	*          time: 1.75,
	*          ease: "easeOutBack",
	*          trigger: .5 <span style="color:#999999">// advances this action early</span>
	*         });
	* 
	* 
	* <span style="color:#999999">// the array brackets in this action form a group of parallel tweens</span>
	* f.push([ 
	*         { label: "swoop",
	*           x: "80",
	*           controlY: "50", <span style="color:#999999">// adds a bezier curve</span>
	*           time: 1.5,
	*           ease: "easeInOutBack"
	*          },
	*           
	*         <span style="color:#999999">// these tweens bounce back, by using 2 cycles</span>
	*         { brightOffset: 50,
	*           rotation: 10,
	*           ease: "easeInOutQuad",
	*           cycles: 2,
	*           time: .5,
	*           delay: .25 
	*         }
	*        ]);
	* 
	* <span style="color:#999999">// a simple callback. You could also subscribe to the "onComplete" event.</span>
	* f.push({ func:"trace", args:"done!" });
	* 
	* f.traceItems();
	* f.start(true); <span style="color:#999999">// passing true presets start props - remove it to see a change.</span>
	* </pre>
	* 						Starts the Fuse and outputs:
	* 						<pre>-Fuse "swoopyIntro" traceItems:
	* ----------
	* -Fuse "swoopyIntro">Item #0: Elements:[delay]
	* -Fuse "swoopyIntro">Item #1 "appear": Elements:[trigger] StartProps:[_alpha, _scale] Props:[_scale, _alpha]
	* -Fuse "swoopyIntro">Item #2 "swoop": Props:[_brightOffset, _rotation, _bezier_]
	* -Fuse "swoopyIntro">Item #3: Elements:[callback]
	* ----------
	* done!
	* </pre>
	* Once a Fuse Array contains at least one action it is <b>controllable</b> with the play methods {@link #start}, 
	* {@link #stop}, 
	* {@link #pause}, 
	* {@link #resume}, 
	* {@link #skipTo},
	* and {@link #fastForward}. Fuses dispatch the events listed at the
	* top of this page during their play cycle. Start properties can be preset for all or a specific subset of actions, using the {@link #setStartProps} method
	* or during any {@link #start} call. (If <code>true</code> were not passed
	* during <code>start</code> in the example above, the target would be visible during the short delay in the first action.) Note
	* that end values are <b>omitted</b> in the <code>"appear"</code> action, making use of Fuse's smart parsing to keep
	* actions concise. Actions can be further <b>condensed</b> with the use of instance defaults {@link #duration}, 
	* {@link #easing}, {@link #target}, and {@link #scope}.<br>
	* <br>
	* The power of Object Syntax is <b>structural</b>. It in fact has few parameters of its own &#8212; <code><code>label</code>, target/addTarget</code>, 
	* <code>event/eventparams</code>, <code>trigger</code>, <code>command</code> and
	* a few extra time-notation options. <b>Standard ZigoEngine tweening parameters</b>, including user-defined variables, make up
	* the bulk of what you'll see listed in any action. You can expect Object Syntax's features to be logical, intuitive and useful.
	* <blockquote>
	* <p>Getting started with Object Syntax</p>
	* <p>Fuse Object Syntax is detailed thoroughly below. To start experimenting with it, simply paste the code block above into
	* a new FLA (AS2.0, 30 FPS), create a symbol on stage and name it <code>box1_mc</code>, then test the movie to see the clip
	* swoop in.</p>
	* <p>The <code>trigger</code> found in the <code>"appear"</code> action allows the animation to overlap with the next
	* action, like motion tweens in a layered timeline, by advancing early. As your first test, remove or comment out the <code>trigger</code> to
	* see the difference in how the Fuse plays. Leave it out as you move on, to eliminate potential property-collision the trigger
	* can create (which Fuse handles gracefully, but may create visual confusion for learners).<br>
	* <br>
	* If you have Flash 8 or higher, add <code>FuseFMP</code> to the register call at top, then try adding <code>start_Blur_blur:50</code> to
	* the <code>"appear"</code> action. Next, <code>push</code> a few new actions into the sequence just before the final
	* trace action, and use them to try features listed below &#8212; the best way to familiarize yourself with Object Syntax is
	* through hands-on testing.<br>
	* <br>
	* <i>Hints:</i> If you're using the Fuse Kit Extension, sidebar of Flash's Actions panel contains a comprehensive list of Fuse
	* methods, properties, Object Syntax parameters and more, all of which will write themselves into your code on double-click.
	* When writing Object Syntax, pay close attention to brackets and commas. Fuse has its own set of error messages that can resemble
	* compiler errors (esp. in Flash 6-8) so be sure to read any errors carefully.</p>
	* <p>Object Syntax Mechanics (advanced topic)</p>
	* <p>Fuse actions are pre-parsed as much as possible as they're added to the Fuse. But Fuse's action interpreter is <b>highly
	* active at runtime</b> as each item begins playing. <br>
	* <br>
	* Internally, standalone program events, delays, callbacks, and boolean property-setters are split
	* off from animation when possible, or at other times blocked with tweens when tight synchronization is called for. All internal
	* tween calls Fuse makes to the engine are monitored carefully for potential failures (which can be caused by no-duration tweens,
	* boolean-setter-only actions and <code>skipLevel</code> settings) to keep the sequence from stalling. Any elements left dangling
	* are picked up in the case of such a failure. Tween interruptions are also handled carefully to determine whether a Fuse containing
	* an advance-trigger might be overwriting one of its own tweens during advance, or if auto-stop functionality should otherwise
	* be honored due to an external interruption.<br>
	* <br>
	* These complex internal mechanics support Fuse's <b>robust runtime parsing capabilities</b>. Its ability to suss out missing
	* end-values when only start-values are provided includes returning any 'open' property (such as x or y) to its current position
	* just before that tween executes. To help you avoid hard-coding sequences, any start or end value can be set to a function
	* (or Delegate) returning that value, and it will be queried as the action executes, allowing you to keep things on-the-spot.
	* Because Fuse can tie directly into your program via callbacks and events, it's also possible to generate, alter, or conditionally
	* skip through Fuse sequences on the fly, or use a Fuse to control other Fuses.<br>
	* <br>
	* </p>
	* <p>Working with asynchronous events (advanced topic)</p>
	* <p>One common question from advanced programmers is whether Fuse can be set up to work with asynchronous program events, such
	* as a sequential loader that waits for an onLoad handler before advancing. The answer is that Fuse does not automate such behavior
	* but that it is easily achieved manually. (It turns out such automation is impractical in the real world. Consider a simple
	* loader class like <code>MovieClipLoader</code>. Using it requires instantiation, writing and wiring custom event handlers
	* that tie back into your program's code &#8212; Simply too much to do in-sequence.)<br>
	* <br>
	* It is easy to do nonetheless, by adding an inline <code>{command:"pause"}</code> action which makes the Fuse wait
	* for your asynchronous event to fire. Set up the dispatching object and any custom event handlers outside the Fuse. Sometimes
	* that routine can be encapsulated in a method triggered by the Fuse. Whatever kicks off the delay, a <code>loadClip</code> call
	* for instance, could also be fired from the Fuse sequence if convenient.<br>
	* <br>
	* Once things are set up and your Fuse has self-paused, the final step is to set up a way to resume
	* the sequence when your event fires. If you're already writing a custom handler for this event you can simply <code>resume()</code> the
	* Fuse in that method's code. (<i>Tip: </i>Use <code>Fuse.getInstance()</code> to contact your Fuse from any scope.) You can
	* also very easily wire any event directly to a Fuse's resume method. <br>
	* <br>
	* For example: <code>myMCL.addListener({onLoadInit:Delegate.create(f,f.resume)});</code>. The fact that MovieClipLoader uses <code>addListener</code> instead
	* of <code>addEventListener</code> (while another class might use yet another event model) is further evidence that this sort
	* of automation is best left to you, and is little of Fuse's business. <br>
	* </p>
	* <br>
	* </blockquote>
	* <b>Object Syntax Detail</b><br>
	* <br>
	* Fuse action objects may be:
	* <ul>
	* <li>Generic objects containing parseable properties<br>
	* <code>{ target:clip1, x:10, seconds:2, ease:Strong.easeInOut }</code></li>
	* <li>An array of such action objects which creates a simultaneous tween Group<br>
	* <code>[ { x:10, seconds:2, ease:Strong.easeInOut }, { start_alpha:0, seconds:.5 } ]</code><br>
	* </li>
	* <li>A nested Fuse which will play as an action<br>
	* <code>myFuse2</code><br>
	* <br>
	* Fuse supports an unlimited level of nesting - for instance myFuse2 can contain & run myFuse3 which contains and runs myFuse4
	* and so on.<br>
	* <br>
	* Nested Fuses many not appear within groups (the Array syntax in the previous point). However it is
	* quite possible to start secondary Fuses from any action or action group with commands like <code>{ scope:myFuse2, func:"start" }</code>.
	* See a more complex example of this below under the <code>command</code> parameter.</li>
	* <li>"Applied actions": a special format for reusing actions by including an <code>action</code> property.<br>
	* <br>
	* For example if an action <code>var intro:Object = { ... }</code> has been defined, you can then include it in later Fuse actions
	* like this:<br>
	* <code>{ target:clip1, action:intro }</code><br>
	* <br>
	* This lets you build multi-purpose behaviors that can be used with different targets, perhaps a custom
	* fade or movement effect.<br>
	* Applied actions may contain the following properties that modify the base action: <code>delay, target, addTarget, label, trigger</code>.<br>
	* While <code>target</code> overrides, <code>addTarget</code> concatenates targets with any that are defined in the action. See
	* below for info on other properties.<br>
	* <br>
	* Applied actions may be included in groups; the action property can also be an array itself. Note that "runtime evaluation" (below)
	* is not supported with the action property itself, although sub-properties in the applied action may make use of that feature.</li>
	* </ul>
	* <br>
	* Fuse action-object properties may be:
	* <ul><li><b>Parseable properties</b>, listed below</li>
	* <li><b>Any custom property</b> you wish to tween (should be pre-declared and set to a number)</li>
	* <li><b>Start values:</b> Prepend <code>start_</code> to any property and it will be set prior to tweening.</li>
	* <li><b>Omitted:</b> Fuse's smart parsing allows you to avoid needing a start and end value for every property. 
	* When a start value is omitted, the property's current value is used as in ZigoEngine. When a start-value is 
	* included but the end value is omitted, Fuse inserts an end value in one of two ways:</li>
	* <ul><li><em>Natural reset:</em> Known properties with a natural reset value like _rotation:0, _alpha:100, _brightOffset:0, etc., 
	* auto-fill the end value as such. For example a fade-in effect can be generated with the simple action <code>{start_alpha:0}</code> 
	* which will tween to 100 automatically.</li>
	* <li><em>Open properties:</em> Props like _x or _width that do not have a natural reset are auto-filled to their value prior to the tween. 
	* In this action a clip will be moved offscreen then slide back to its current location: <code>{ start_x:-100, start_y:-100 }</code>.</li>
	* </ul></ul>
	* <br>
	* Fuse action-object values may be types:
	* <ul><li><b>Number</b> - a tween's end position. <code>x:100</code></li>
	* <li><b>String</b> - calculate tween using <b>relative</b> positioning.<br>
	* Example: <code>rotation:"-90"</code> yields a counter-clockwise rotation.</li>
	* <li><b>Boolean</b> values, set at start or end of tween.<br>
	* Example: <code>start_visible:true</code></li>
	* <li><b>Tint</b> values can be Number (<code>0x000000</code>), String (<code>"#000000"</code>), or <code>null</code> (reset)<br>
	* Example: <code>tint:"#FF3300"</code></li>
	* <li><b>Time</b> is specified in seconds, and may be Number or timecode-String format.<br>
	* Examples: <code>seconds:2</code>, <code>startAt:"01:75"</code> - timecode for a 1.75-second delay</li>
	* <li><b>Function</b> - (Advanced) "Runtime evaluation" - function is queried as the action is played in the sequence. 
	* Functions should return values appropriate to the property.<br>
	* Example: <code>{ x:function(){ return _root._xmouse; } }</code><br>
	* <br>
	* This is a powerful feature that helps eliminate the need to hardcode values in advance. 
	* Fuses can be written to be "live", querying for targets and values themselves by retrieving state variables from within your program.<br>
	* <br>
	* Such functions will be scoped first to the action then the Fuse instance's <code>scope</code> property.  
	* If <code>scope</code> is already being used for callbacks, you can use a Delegate to individually scope runtime-evaluation functions.</li>
	* <li><b>Multi-value Object or Array</b> - (Advanced) A new feature is the ability to directly tween multiple values in an Object or Array. 
	* Note that like any custom variables these objects must exist prior to tweening and have their properties set to numerical values in advance.<br>
	* Examples: <code>{ myArray:[10,20], myMatrix:{a:0, b:1, tx:100}, GradientBevel_colors:[0xFF0000, 0x333333, 0x00FFFF] }</code></li>
	* <li><b>Colors Array</b> - (Advanced) Tweening a generic array of color values can help with situations like tweening the properties of a gradient fill
	* that's redrawn on tween update. Any array whose name contains 'colors' (case is ignored) will be handled by the engine as an array of color values. 
	* Note that the internal colortransforms are not applied to any target, simply updated within the array.<br>
	* Example: <code>{ myColors: [ 0x000000, 0xFFFFFF ], scope:this, updfunc:'redrawGradient' }</code></li>
	* </ul>
	* <br>
	* Parseable properties:
	* <ul>
	* <li><code>label</code> An action's string id, used for skipTo and fastForward. Groups are considered single actions by Fuse. (To label a 
	* group include a label within any of its sub-actions.) As a convenience, labels also appear in output messages.</li>
 	* <li><code>target</code> Animation target or Array of targets. Overrides the instance's default {@link #target} list.</li>
	* <li><code>addTarget</code> Concatenates one or an Array of targets with the default {@link #target} list.</li>
	* <li><code>ease or easing</code> Accepts same formats as {@link com.mosesSupposes.fuse.ZigoEngine#doTween}'s easing parameter.</li>
	* <li><code>seconds, time or duration</code> See time formatting above.</li>
	* <li><code>delay or startAt</code> See time formatting above.</li>
	* <li><code>event</code> String declaring a custom event that should be dispatched by the engine.<br>
	* Subscribe to this custom event on the Fuse instance the same as you would for built-in events (see header).</li>
	* <li><code>eventparams</code> An object whose properties will be copied to the event object dispatched with the custom event. (Requires that the <code>event</code> property is defined)</li>
	* <li><code>func</code> Function, string name of function, or Easyfunc string like <code>"myClip.doSomething(true);"</code> ({@link com.mosesSupposes.fuse.Shortcuts} must be registered to use the easyfunc feature.)</li>
	* <li><code>scope</code> Object - overrides instance default {@link #scope}. Note that in Fuse actions this property is special in that it will be applied to all callbacks or runtime-evaluation functions if not otherwise defined.</li>
	* <li><code>args</code> One argument or an array of arguments to pass to the <code>func</code> callback.</li>
	* <li><code>startfunc</code> Callback fired after any delay and as tween is starting. Supports various formats - see func above.</li>
	* <li><code>startscope</code> If not defined, the <code>scope</code> property or instance default {@link #scope} will be used.</li>
	* <li><code>startargs</code> One argument or an array of arguments to pass to the <code>startfunc</code> callback.</li>
	* <li><code>updfunc</code> Callback fired on engine pulse as the tweens in the action are updated. Accepts various formats - see func above.</li>
	* <li><code>updscope</code> If not defined, the <code>scope</code> property or instance default {@link #scope} will be used.</li>
	* <li><code>updargs</code> One argument or an array of arguments to pass to the <code>updfunc</code> callback.</li>
	* <li><code>extra1</code> Optional fifth parameter sent to easing method. Elastic easing amplitude or Back easing overshoot.</li>
	* <li><code>extra2</code> Optional sixth parameter sent to easing method. Elastic easing period.</li>
	* <li><code>_bezier_</code> (Not necessary, see controlX, controlY below.) Generic object with some or all of the properties <code>{x:,y:,controlX:,controlY:}</code>. Relative (string) values are okay. Note that only one control param is necessary to generate a curved motion path.</li>
	* <li><code>controlX, controlY</code> Including one or both of these parameters in a Fuse action along with x and/or y generates a bezier curve similar to using the _bezier_ property but without the need for a nested object.</li>
	* <li><code>cycles</code> An integer 2 or higher, tweens back and forth between start and end positions. Infinite cycles (0 or "LOOP" in {@link com.mosesSupposes.fuse.ZigoEngine#doTween}) are not allowed in Fuses.</li>
	* <li><code>roundResults</code> Overrides the class setting {@link com.mosesSupposes.fuse.ZigoEngine#ROUND_RESULTS} for an individual action.</li>
	* Useful for instance, if the class default is true but you need to execute a tween such as DropShadow_alpha which requires a 0-1 range.</li>
	* <li><code>skipLevel</code> 0,1, or 2. An advanced behavior setting for cases where tweens fail. See {@link com.mosesSupposes.fuse.ZigoEngine#SKIP_LEVEL} for details. In Fuse, this parameter also applies to the custom <code>event</code> parameter, although standard Fuse events like <code>onComplete</code> are not skipped.</li>
	* <li><code>trigger</code> May be set as seconds (see time formatting above) or set to <code>true</code> if in a group to indicate advance after the item trigger is grouped with.<br>
	* Advances the sequence prior to action completion. This is a powerful feature that makes sequencing far less rigid and more timeline-like.<br>
	* Example 1: In this group the sequence advances after the fade action.
	* <code>[ { start_alpha:0, seconds:.5, trigger:true}, { x:'100', seconds:3 } ]</code><br>
	* Example 2: Here the sequence advances after 1.5 seconds, while the action takes 3 seconds.
	* <code>{ width:500, delay:1, seconds:2, trigger:1.5 }</code><br><br>
	* Note that the <code>onComplete</code> Fuse event is not fired until any trailing tweens from triggered actions finish.</li>
	* <li><code>command</code> String "start","stop","pause","resume","skipTo", or "setStartProps".<br>
	* Allows actions to control Fuse play.<br>
	* Example: a final action of <code>{command:"start"}</code> causes the Fuse to loop.<br>
	* Commands should be separate actions. They may not appear within action groups or be blocked with tweens or callbacks.<br>
	* Actions containing a <code>command</code> property may ONLY contain the additional properties: <code>scope, args, label, delay</code>.<br>
	* Note that any arguments in <code>args</code> are sent to the Fuse command, and <code>scope</code> is only used for runtime-evaluation of other params set to function (see "Runtime-evaluation" above).<br><br>
	* Examples of a command with an argument: <code>{ command:"skipTo", args:3 }</code>, <code>{ command:"start", args:true }</code></li>
	* <li><span style="text-decoration:line-through"><code>easyfunc</code></span> Removed from kit. <code>func, startfunc, updfunc</code> parameters now accept easyfunc strings (see func above).</li> 
	* </ul>
	* (Advanced) The following example illustrates how command actions can be used in more complex arrangements. Here a complex group of Fuses is 
	* associated by controlling each other, without the use of nested Fuses.<br>
	* <code>var fuseA:Fuse = new Fuse();
	* var fuseB:Fuse = new Fuse();
	* var fuseC:Fuse = new Fuse();
	* // .. build Fuses here then..
	* // final action in fuseC will resume the master Fuse,
	* fuseC.push({ scope:fuseA, func:"resume" });
	* // .. somewhere in fuseA, begin the others & pause:
	* fuseA.push([{scope:fuseB, func:"start"},
	* 				 {scope:fuseC, func:"start"} ]);
	* fuseA.push({ command:"pause" }); // keep command in a separate action
	* // .. continue pushing actions into fuseA here.
	* // .. fuseA will resume when fuseC hits its final "resume" action.</code>
	* <br>
	* Unless you have set <code>FuseItem.ADD_UNDERSCORES</code> to false, your Fuse actions may 
	* <i>optionally</i> omit underscores for the known properties below, listed here without. For descriptions of 
	* ZigoEngine properties (shown in bold), look up their underscored counterparts in 
	* {@link com.mosesSupposes.fuse.ZigoEngine#doTween}.
	* <ul>
	* <li><code>alpha</code></li>
	* <li><b><code>brightOffset</code></b></li>
	* <li><b><code>brightness</code></b></li>
	* <li><b><code>colorReset</code></b></li>
	* <li><b><code>colorTransform</code></b></li>
	* <li><b><code>contrast</code></b></li>
	* <li><b><code>fade</code></b></li>
	* <li><b><code>frame</code></b></li>
	* <li><code>height</code></li>
	* <li><b><code>invertColor</code></b></li>
	* <li><code>rotation</code></li>
	* <li><b><code>scale</code></b></li>
	* <li><b><code>size</code></b></li>
	* <li><b><code>tint</code></b></li>
	* <li><b><code>tintPercent</code></b></li>
	* <li><code>visible</code></li>
	* <li><code>width</code></li>
	* <li><code>x</code></li>
	* <li><code>xscale</code></li>
	* <li><code>y</code></li>
	* <li><code>yscale</code></li>
	* </ul>
 	* 
 	* @see #target
 	* @see #scope
 	* @see #push
 	* @see #pushTween
 	* @see #open
	*/
	public function Fuse (fuseAction:Object)
	{
		EventDispatcher.initialize(this);
		this._nID = registerInstance(this); // Fuse identifier retrievable using the ID property
		this._nState = -1;
		this._aDefaultTargs = new Array();
		if (arguments.length>0) {
			this.splice.apply(this, ((new Array(0, 0)).concat(arguments)));
		}
		// retroactively disable some Array methods - this technique conserves filesize.
		var unsupport:Array = ['concat','join','sort','sortOn'];
		for (var i:String in unsupport) Fuse.prototype[unsupport[i]] = function() { if (Fuse.OUTPUT_LEVEL>0) FuseKitCommon.error('105'); };
	}
	
	/**
	 * This function is overwritten during EventDispatcher.initialize(). 
	 * @ignore
	 * Add a listener for a particular event
	 * @param event the name of the event ("onComplete", etc)
	 * @param the function or object that should be called
	 * @see #removeEventListener
	 */
	public function addEventListener(event:String, handler:Object):Void {}
	
	/**
	 * This function is overwritten during EventDispatcher.initialize(). 
	 * @ignore
	 * Remove a listener for a particular event
	 * @param event the name of the event ("onComplete", etc)
	 * @param the function or object that should be called
	 * @see #addEventListener
	 */
	public function removeEventListener(event:String, handler:Object):Void {}
	
	/**
	* Deletes all variables and properties in the Fuse instance. 
	* @usage
	* You should remove all listeners before calling destroy(), then after the call delete any variable references to the instance cleared.
	* <pre>
	* myFuse.removeEventListener('onComplete',this);
	* myFuse.destroy();
	* delete myFuse;
	* </pre>
	* @see #autoClear
	* @see #AUTOCLEAR
	* @see #getInstance
	*/
	public function destroy():Void
	{
		if (Fuse.OUTPUT_LEVEL>1) FuseKitCommon.output(getHandle()+' destroy.');
		this.stop(true);
		splice(0,length);
		_aDefaultTargs = null;
		scope = null;
		// required for stripping listeners. 0,7 is not a mistake - do not change
		_global.ASSetPropFlags(this,null,0,7); 
		var id:Number = _nID;
		for (var i:String in this) delete this[i];
		removeInstanceAt(id, true);
		delete id;
		delete this;
	}
	
	/**
	* Instance-management: Gets a Fuse instance by its id or label
	* @description	This simple method returns one known Fuse instance. For more complex options use {@link #getInstances}.
	* @param idOrLabel 		Fuse's numerical {@link #id} or {@link #label} identifying a unique Fuse instance.
	* @return				a Fuse instance if found or null if not
	* @see #getInstances
	*/
	public static function getInstance(idOrLabel:Object):Fuse
	{
		if (typeof idOrLabel=='number') return _aInstances[idOrLabel];
		if (typeof idOrLabel=='string') {
			for (var i:String in _aInstances) if (Fuse(_aInstances[i]).label==idOrLabel) return _aInstances[i];
		}
		return null;
	}
	
	/**
	* Instance-management: Get an array of some or all Fuse instances in active memory, with filtering options.
	* @description 
	* <pre>// get currently playing Fuses that handle the target my_mc
	* var myMcFuses:Array = Fuse.getInstances("playing",my_mc);
	* 
	* // get all the Fuses in active memory
	* var fuses:Array = Fuse.getInstances();</pre>
	* @param stateFilter		nothing/null/{@link com.mosesSupposes.fuse.FuseKitCommon#ALL} for all Fuse instances in active memory, or a play state "playing", "stopped" or "paused"
	* @param targets			optional - a single target, an Array of targets, or a list of targets starting with the second param.
	* @return					an array containing one or more Fuse instances matching search criteria
	* @see	#getInstance
	*/
	public static function getInstances(stateFilter:String, targets:Object):Array
	{
		var all:Boolean = (stateFilter==null || (stateFilter.toUpperCase())=='ALL');
		if (!(targets instanceof Array)) targets = arguments.slice(1);
		var a:Array = [];
		for (var i:String in _aInstances) {
			var instance:Fuse = _aInstances[i];
			if (_aInstances[i]==null) continue;
			// if specified state does not match
			if (all==false && instance.state!=stateFilter) continue; 
			// yes: state matches and no targets to filter by
			var found:Boolean = (targets.length==0); 
			if (found==false) {
				// AS2 bug, break does not work twice!
				if (found==true) continue;
				var instTargs:Array = instance.getActiveTargets(true);
				for (var j:String in targets) {
					for (var k:String in instTargs) {
						// yes: a target passed in was found in the instance
						if (instTargs[k]==targets[j]) { 
							found = true;
							break;
						}
					}
				}
			}
			if (found==true) a.unshift(instance);
		}
		return a;
	}
	
	/**
	* Instance default: an auto-assigned numerical reference
	* @return Internal id based on instance count.
	* @see #label
	* @see #getInstance
	*/
	public function get id():Number { return _nID; }	
	
	/**
	* Retrieves a Fuse instance's current play-state string. 
	* @return <code>"stopped", "playing", or "paused"</code>
	* @see #currentIndex
	*/
	public function get state():String
	{
		switch(_nState) {
			case -1 : return 'stopped';
			case 0 : return 'paused';
			case 1 : return 'playing';
			default : return undefined;
		}
	}
	
	/**
	* Retrieves the current play-index of a Fuse instance.
	* @return A number starting at 0 for the first action
	* @see #state
	* @see #currentLabel
	*/ 
	public function get currentIndex():Number { return this._nIndex; } 
	
	/**
	* Retrieves the currently playing action's label, if defined.
	* @description <pre>{ label:"introFade", start_alpha:0, start_brightOffset:100, time:1.5, ease:"easeInExpo" }</pre>
	* @return A string set in the action object using the label property.
	* @see #Fuse
	* @see #label
	* @see #state
	* @see #currentIndex
	*/
	public function get currentLabel():String { return (this[_nIndex]).label; }
	
	/**
	 *  see set target
	 *  @ignore
	 */
	public function get target():Object { return (_aDefaultTargs.length==1) ? _aDefaultTargs[0] : _aDefaultTargs; }
	
	/**
	* Instance default: Sets one or more animation targets that will be used for any actions that don't specify their own.
	* @description Overwrites prior existing targets.
	* <pre>var f:Fuse = new Fuse();
	* f.target = [clip1, clip2];</pre>
	* @param  one target or an array of targets
	* @return a single animation target if one is set or an Array of targets if more than one is set.
	* @see #addTarget
	* @see #removeTarget
	* @see #getActiveTargets
	*/
	public function set target(t:Object):Void {
		delete _aDefaultTargs;
		if (t!=null) {
			addTarget(t);
		}
	}
	
	/**
	* Adds to current default target list.
	* @description <pre>myFuse.addTarget(clip5);</pre>
	* @param  accepts one or more targets, or an array of targets
	* @see #target
	* @see #removeTarget
	* @see #getActiveTargets
	*/
	public function addTarget(t:Object):Void
	{
		if (_aDefaultTargs==null) this._aDefaultTargs = [];
		if (arguments[0] instanceof Array) arguments = arguments[0];
		for (var i:String in arguments) {
			var found:Boolean = false;
			for (var j:String in _aDefaultTargs) {
				if (arguments[i]==_aDefaultTargs[j]) {
					found = true;
					break;
				}
			}
			if (found==false) _aDefaultTargs.push(arguments[i]);
		}
	}
	
	/**
	* Removes targets from the current default target list.
	* @description <pre>myFuse.removeTarget(clip5);</pre>
	* @param  accepts one or more targets, or an array of targets
	* @see	#target
	* @see	#addTarget
	* @see #getActiveTargets
	*/
	public function removeTarget(t:Object):Void
	{
		if (_aDefaultTargs==null || _aDefaultTargs.length==0) return;
		if (arguments[0] instanceof Array) arguments = arguments[0];
		for (var i:String in arguments) {
			for (var j:String in _aDefaultTargs) {
				if (arguments[i]==_aDefaultTargs[j]) _aDefaultTargs.splice(Number(j),1);
			}
		}
	}
	
	/**
	* Gets both the default target list and any targets in the action currently being played.
	* @param includeDefaults	If true is passed, list includes the Fuse instance's default target list plus active action targets.
	* @return Array of targets currently being handled by the playing or paused action, plus the Fuse instance's default target list if true was passed.<br>
	* <br>If the Fuse instance queried is stopped, an empty array is returned.
	* @see #target
	* @see #addTarget
	* @see #removeTarget
	*/
	public function getActiveTargets(includeDefaults:Boolean):Array
	{
		if (_nState==-1) return ([]);
		var targetList:Array;
		if (includeDefaults==true) targetList = _aDefaultTargs.slice();
		else targetList = [];
		return ( FuseItem(this[_nIndex]).getActiveTargets(targetList) );
	}
	
	// ----------------------------------------------------------------------------------------------------
	//       Array-style Methods
	// ----------------------------------------------------------------------------------------------------
	
	/**
	* Returns a copy of Fuse as a new Fuse instance.
	* @return 	new Fuse instance with default settings and actions.
	* @see	#push
	* @see	#pushTween
	* @see	#pop
	* @see	#unshift
	* @see	#shift
	* @see	#splice
	* @see	#slice
	* @see	#reverse
	* @see	#clone
	*/
	public function clone():Fuse
	{
		var initObjs:Array = [];
		for (var i:Number=0; i<length; i++) {
			initObjs.push(FuseItem(this[i]).getInitObj());
		}
		var f:Fuse = new Fuse();
		f.push.apply(f,initObjs);
		f.scope = scope;
		f.target = target;
		return f;
	}
	
	/**
	* Adds one or more elements to the end of a Fuse and returns the new length of the Fuse.
	* @usage <code>myFuse.push({ x:"100" }); // add an action to the end of the sequence </code>
	* @param fuseAction		One or more generic "action" objects or arrays in Fuse Object Syntax starting at this argument
	* @return 				New length of Fuse instance
	* @see	#pushTween
	* @see	#pop
	* @see	#unshift
	* @see	#shift
	* @see	#splice
	* @see	#slice
	* @see	#reverse
	* @see	#clone
	*/
	public function push(fuseAction:Object):Number
	{
		this.splice.apply(this, (new Array(length, 0)).concat(arguments));
		return length;
	}
	
	/**
	* Lets you add an item to the Fuse in ZigoEngine.doTween() syntax. Pushes tween arguments into Fuse instance and accepts the same arguments as ZigoEngine.doTween().
	* @param targets		tween target object or array of target objects
	* @param props			tween property or Array of properties
	* @param endvals		tween end-value or Array of corresponding end-values
	* @param seconds		tween duration
	* @param ease			function, shortcut-string, or custom-easing-panel object
	* @param delay			seconds to wait before performing the tween
	* @param callback		function, string, or object
	* @return				new length of Fuse instance
	* @see com.mosesSupposes.fuse.ZigoEngine#doTween
	* @see	#push
	* @see	#pop
	* @see	#unshift
	* @see	#shift
	* @see	#splice
	* @see	#slice
	* @see	#reverse
	* @see	#clone
	*/
	public function pushTween(targets:Object, props:Object, endvals:Object, seconds:Number, ease:Object, delay:Number, callback:Object):Number
	{
		this.push({__buildMode:true, tweenargs:arguments});
		return length;
	}
	
	/**
	* Removes the last element from a Fuse and returns that action object.
	* @return	 	original object passed by user
	* @see	#push
	* @see	#pushTween
	* @see	#unshift
	* @see	#shift
	* @see	#splice
	* @see	#slice
	* @see	#reverse
	* @see	#clone
	*/
	public function pop():Object 
	{
		var o:Object = FuseItem(this[length-1]).getInitObj();
		this.splice(length-1, 1);
		return o;
	}
	
	/**
	* Adds one or more elements to the beginning of a Fuse and returns the new length of the Fuse.
	* @usage <code>myFuse.push({ x:"100" }); // add an action to the beginning of the sequence </code>
	* @param fuseAction		One or more generic "action" objects or arrays in Fuse Object Syntax starting at this argument
	* @return 				New length of Fuse instance
	* @see	#push
	* @see	#pushTween
	* @see	#pop
	* @see	#shift
	* @see	#splice
	* @see	#slice
	* @see	#reverse
	* @see	#clone
	*/
	public function unshift(fuseAction:Object):Number
	{
		this.splice.apply(this, ((new Array(0, 0)).concat(arguments)));
		return length;
	}
	
	/**
	* Removes the first element from a Fuse and returns that action object.
	* @return 		original object passed by user
	* @see	#push
	* @see	#pushTween
	* @see	#pop
	* @see	#unshift
	* @see	#splice
	* @see	#slice
	* @see	#reverse
	* @see	#clone
	*/
	public function shift():Object
	{
		var o:Object = FuseItem(this[0]).getInitObj();
		this.splice(0, 1);
		return o;
	}
	
	/**
	* Used to insert or remove items. Works almost exactly like Array.splice. Removed actions are destroyed permanently, with the exception of nested Fuses.
	* @usage <code>myFuse.splice(0, 2); // remove two items from the beginning of the sequence</code><br>
	* <code>myFuse.splice(-2, 0, { x:"100" }); // insert an action two steps from the end of the sequence</code>
	* @param startIndex			index in Fuse to begin removing objects
	* @param deleteCount		number of objects to delete from startIndex
	* @param fuseAction			One or more generic "action" objects or arrays in Fuse Object Syntax starting at this argument
	* @see	#push
	* @see	#pushTween
	* @see	#pop
	* @see	#unshift
	* @see	#shift
	* @see	#slice
	* @see	#reverse
	* @see	#clone
	*/
	public function splice(startIndex:Number, deleteCount:Number, fuseAction:Object):Void
	{
		this.stop(true);
		var si:Number = Number(arguments.shift());
		if (si<0) si = length+si;
		deleteCount = Number(arguments.shift());
		var newItems:Array = new Array();
		for (var i:Number=0; i<arguments.length; i++) { 
			// convert new objs to FuseItems before splicing
			var item:Object = ( (arguments[i] instanceof Fuse) ? arguments[i] : (new FuseItem((si+i), arguments[i], _nID)) );
			this.addEventListener('onStop', item); // Reverse-subscribe event so it cascades to items
			this.addEventListener('evtSetStart', item);
			newItems.push(item);
		}
		//deleteItems
		// FLASH 7 COMPILER BUG throws an error when deadItems is correctly typed to Array. Luckily, for-in works the same with Object.
		var deadItems:Object = (super.splice.apply(this, ((new Array(si,deleteCount)).concat(newItems))));
		for (var j:String in deadItems) {
			var item:Object = deadItems[j];
			this.removeEventListener('onStop', item);
			this.removeEventListener('evtSetStart', item);
			if (item instanceof Fuse) {
				item.removeEventListener('onComplete', _oDel1); // safety
				// does not destroy nested Fuse during removal
			}
			else { 
				// destroy FuseItem instance
				item.destroy();
				delete item;
			}
		}
		// renumber items
		for (var i:Number=0; i<length; i++) {
			FuseItem(this[i])._nItemID = i;
		}
	}
	
	/**
	* Returns a new array instance consisting of a range of elements from the original array without modifying the original array. The array returned by this method includes the indexA element and all elements up to, but not including indexB element. If no parameters are passed, a duplicate of the original array is generated. For more information, see the Flash help explanation of Array.slice.
	* @param indexA:Number (optional)	A number specifying the index of the starting point for the slice. If start is negative, the starting point begins at the end of the array, where -1 is the last element.
	* @param indexB:Number (optional)	A number specifying the index of the ending point for the slice. If you omit this parameter, the slice includes all elements from the starting point to the last element of the array. If end is negative, the ending point is specified from the end of the array, where -1 is the last element.
	* @return		 					an array consisting of a range of elements from the original array.
	* @see	#push
	* @see	#pushTween
	* @see	#pop
	* @see	#unshift
	* @see	#shift
	* @see	#splice
	* @see	#reverse
	* @see	#clone
	*/
	public function slice(indexA:Number, indexB:Number):Array
	{
		var a:Array = super.slice(indexA,indexB);
		var initObjs:Array = new Array();
		for (var i:Number=0; i<arguments.length; i++) {
			initObjs.push(FuseItem(this[i]).getInitObj());
		}
		return initObjs;
	}
	
	/**
	* Reverse the sequence of the Fuse
	* @see	#push
	* @see	#pushTween
	* @see	#pop
	* @see	#unshift
	* @see	#shift
	* @see	#splice
	* @see	#slice
	* @see	#clone
	*/
	public function reverse():Void
	{
		this.stop(true);
		super.reverse();
		// renumber
		for (var i:Number=0; i<length; i++) FuseItem(this[i])._nItemID = i;
	}
	
	/**
	* Traces specific or all objects contained within the fuse
	* @param indexA:Number (optional) A number specifying the index of the starting point for the slice. If start is negative, the starting point begins at the end of the array, where -1 is the last element.
	* @param indexB:Number (optional) - A number specifying the index of the ending point for the slice. If you omit this parameter, the slice includes all elements from the starting point to the last element of the array. If end is negative, the ending point is specified from the end of the array, where -1 is the last element.
	* @see #toString
	* @see #id
	* @see #label
	*/
	public function traceItems(indexA:Number, indexB:Number):Void
	{
		var s:String = '';
		var a:Array = super.slice(indexA,indexB);
		s+= (getHandle()+' traceItems:'+'\n----------\n');
		for (var i:Number=0; i<a.length; i++) {
			if (a[i] instanceof Fuse){
				s+= (getHandle()+'>Item#'+i+': [Nested Fuse] '+a[i])+'\n';
			}else{
				s+= (a[i])+'\n';
			}
		}
		s+= ('----------');
		FuseKitCommon.output(s);
	}
	
	/**
	* @return a string representation of the fuse including its id, and label if defined.
	* @see #traceItems
	* @see #id
	* @see #label
	*/
	public function toString():String { return getHandle()+' (contains '+length+((length==1)?' item)':' items)'); }
	
	
	// ----------------------------------------------------------------------------------------------------
	//       Play-Control Methods
	// ----------------------------------------------------------------------------------------------------
	
	/**
	* General: Presets start-properties like <code>start_x</code> in all or specific items. 
	* @description In this example a sequence is set up and all start props are set, although the Fuse may not be used until later.
	* <pre>var f:Fuse = new Fuse();
	* f.target = clip1;
	* f.push({ start_alpha:0 }); // fade up
	* f.push({ x:'100', start_scale:150}); // scale down and slide
	* f.setStartProps();</pre>
	* If you want to set start props as the Fuse is started, you can pass <code>setStartProps</code> parameters to {@link #start}.
	* @param nothing/null/{@link com.mosesSupposes.fuse.FuseKitCommon#ALL} to set all start props in the Fuse. 
	* To specify some actions while excluding others, pass an array of item indices/labels or a series of indices/labels as separate parameters.
	* @see #start
	* @see #closeAndStart
	*/
	public function setStartProps(trueOrItemIDs:Object):Void
	{
		var all:Boolean = (arguments.length==0 || trueOrItemIDs===true || trueOrItemIDs==FuseKitCommon.ALL);
		dispatchEvent({target:this, 
					   type:'evtSetStart',
					   all:all,
					   filter:(trueOrItemIDs instanceof Array) ? trueOrItemIDs : arguments,
					   curIndex:((_nState==1) ? _nIndex : -1),
					   targs:_aDefaultTargs,
					   scope:scope});
	}
	
	/**
	* Play-control: Begins sequence play at index 0, with option to set start props prior to play.
	* @description In this example all start props are set during start by passing true.
	* <pre>var f:Fuse = new Fuse();
	* f.target = clip1;
	* f.push({ start_alpha:0 }); // fade up
	* f.push({ x:'100', start_scale:150}); // scale down and slide
	* f.start(true);</pre>
	* @param 	setStart	A {@link #setStartProps} call is generated from all arguments before the Fuse begins playing.
	* @see #stop
	* @see #pause
	* @see #resume
	* @see #skipTo
	* @see #fastForward
	*/
	public function start(setStart:Object):Void
	{
		close();
		this.stop(true);
		this._nState = 1;
		if (length==0) {
			advance(false,true,false); // fires onComplete, state must be playing
		}
		if (setStart!=null && setStart!=false){
			setStartProps.apply(this,arguments);
		}
		dispatchEvent({target:this, type:'onStart'});
		if (OUTPUT_LEVEL>1) FuseKitCommon.output(getHandle()+'  start.');
		playCurrentItem();
	}
	
	/**
	* Play-control: Stops a playing or paused Fuse instance and resets the play-index to 0.
	* @see #start
	* @see #pause
	* @see #resume
	* @see #skipTo
	* @see #fastForward
	*/
	public function stop():Void
	{
		if(_nState!=-1) { 
			for (var i:Number=0; i<length; i++) {
				// stop all triggered items to kill trailing tweens.
				if ((this[i]) instanceof Fuse) {
					Fuse(this[i]).removeEventListener('onComplete', _oDel1);
					if (Fuse(this[i]).state=='playing') Fuse(this[i]).stop();
				}
				else if (i==_nIndex || (FuseItem(this[i]).hasTriggerFired())==true) {
					FuseItem(this[i]).stop();
				}
			}
		}
		var prevstate:Number = _nState;
		_nState = -1;
		// arg true internal only, don't broadcast stop if stopped.
		if (!(arguments[0]===true) && prevstate!=-1) {
			dispatchEvent({target:this, type:'onStop'});
			if (OUTPUT_LEVEL>1) FuseKitCommon.output(getHandle()+'  stop.');
		}
		_nIndex = 0;
		clearInterval(_nDelay);
		_nTimeCache = _nDelay = -1;
	}
	
	/**
	* Play-control: Starts Fuse at a particular index/label.
	* @description <pre>var f:Fuse = new Fuse();
	* f.target = clip1;
	* f.push({ start_alpha:0 });
	* f.push({ x:'100', label:"slideRight"});
	* //later...
	* f.skipTo("slideRight"); // same as f.skipTo(1);</pre>
	* @param indexOrLabel		numerical item index or label string. Pass a negative index to count back from end, like -1 for last item.
	* @see #start
	* @see #stop
	* @see #pause
	* @see #resume
	* @see #fastForward
	*/
	public function skipTo(indexOrLabel:Object):Void
	{
		close();
		var index:Number = normalizeIndex(indexOrLabel);
		if (index==null) {
			if (OUTPUT_LEVEL>0) FuseKitCommon.error('102','skipTo',String(indexOrLabel));
			return;
		}
		// hidden second arg passed by FuseItem
		if (index==_nIndex && arguments[1]===true) { 
			if (OUTPUT_LEVEL>0) FuseKitCommon.error('103',String(indexOrLabel),_nIndex);
		}
		if ((this[_nIndex]) instanceof Fuse) {
			Fuse(this[_nIndex]).removeEventListener('onComplete', _oDel1);
		}
		// (Item will be replayed if skipTo called on current item)
		this.stop(true); 
		_nIndex = index;
		var s:Number = _nState;
		this._nState = 1;
		// skipTo is being used to start the Fuse
		if (s==-1) dispatchEvent({target:this, type:'onStart'}); 
		playCurrentItem();
		if (OUTPUT_LEVEL>1) FuseKitCommon.output('skipTo:'+index);
	}
	
	/**
	* Play-control: Pauses a playing Fuse instance and its running tweens. Waits for {@link #resume} call to proceed.
	* @see #start
	* @see #stop
	* @see #resume
	* @see #skipTo
	* @see #fastForward
	*/
	public function pause():Void
	{
		if(_nState==1){
			for (var i:Number=0; i<=_nIndex; i++) {
				if ((this[i]).state==='playing' || (this[i])._nPlaying>0) {
					(this[i]).pause(); // do not cast
				}
			}
			if (_nTimeCache!=-1) {
				// remaining time in delay
				_nTimeCache -= getTimer(); 
				clearInterval(_nDelay);
			}
			this._nState = 0;
			if (OUTPUT_LEVEL>1) FuseKitCommon.output(getHandle()+'  pause.');
			dispatchEvent({target:this, type:'onPause'});
		}
	}
	
	/**
	* Resumes a paused Fuse instance and its animations. Attempts to correct for animations that have been disrupted during pause.
	* @see #start
	* @see #stop
	* @see #pause
	* @see #skipTo
	* @see #fastForward
	*/
	public function resume():Void
	{
		if (_nState!=0) return; // Behavior change from 1.0: only accept resume calls if paused!
		close();
		this._nState = 1;
		if (OUTPUT_LEVEL>1) FuseKitCommon.output(getHandle()+'  resume.');
		dispatchEvent({target:this, type:'onResume'});
		if (_nTimeCache!=-1) {
			playCurrentItem(false, true);
		}
		// resume
		for (var i:Number=0; i<=_nIndex; i++) {
			if ((this[i]) instanceof Fuse && (this[i]).state=='paused') {
				Fuse(this[i]).resume();
			}
			else if ((this[i])._nPlaying==0) {
				FuseItem(this[i]).pause(true);
			}
		}
	}
	
	/**
	* Fast-forwards animations in some or all remaining actions.
	* @description	Behavior:
	* <ul><li>Calling with no arguments: Fast-forwards all remaining animation in the Fuse. The onComplete event is fired.</li>
	* <li>Passing a positive or negative integer or string: Fast-forwards up to, then resumes play at the index specified. 
	* Negative integer counts back from last item, string locates an action or nested Fuse by its label property.</li>
	* <li>Callbacks and events are disregarded during fast-forwarding.</li>
	* <li>If you pass 0 or an index that has already played, a warning is thrown and skipTo is called instead.</li>
	* <li>Note that when passing a label string, nested Fuse instance labels are scanned but not action labels within 
	* nested Fuses. To fast-forward to a specific point in a nested Fuse, first call fastForward to advance to the 
	* primary Fuse, then a second time on the secondary Fuse.</li>
	* <li>Fuse does not include any similar animation-rewinding method, which would not be practical for a number of 
	* reasons within its current architecture.</li>
	* </ul>
	* @usage
	* <pre>// fast-forward all animations and end fuse:
	* myFuse.fastForward();
	* 
	* // fast-forward from current index and resume play at index 8
	* myFuse.fastForward(8);
	* 
	* // fast-forward then resume at a labeled action like { x:"100", label:"slider" }
	* myFuse.fastForward("slider");
	* 
	* // fast-forward but play final action
	* myFuse.fastForward(-1);
	* </pre>
	* The following example demonstrates fast-forwarding to an index within a nested Fuse instance, and also shows 
	* how a nested Fuse's label property can be used to fast-forward to. Note that the fast-forward commands could 
	* alternatively be written using positive or negative integers as in the examplese above.
	* <pre>var nestedFuse1:Fuse = new Fuse(
	* 	{ rotation:180, label:"spin" },
	* 	{ tint:0x33FF00, tintPercent:50, label:"tint" }
	* );
	* nestedFuse1.label = "NF1";
	* nestedFuse1.target = clip1_mc;
	* 
	* var mainFuse:Fuse = new Fuse(
	* 	{ x:"100", label:"slideRight" },
	* 	nestedFuse1,
	* 	{ x:"-100", label:"slideLeft" }
	* );
	* mainFuse.target = clip1_mc;
	* mainFuse.start();
	* 
	* // fast-forward to the "tint" action by using two fastForward calls.
	* mainFuse.fastForward("NF1"); // first jump to the nested Fuse using its label
	* nestedFuse1.fastForward("tint"); // then jump to the tint action using its label
	* </pre>
	* @param resumeAtIndexOrLabel		Numerical item index or label string to fast-forward up to and resume playing at.<br>
	* @see #start
	* @see #stop
	* @see #pause
	* @see #resume
	* @see #skipTo
	*/
	public function fastForward(resumeAtIndexOrLabel:Object):Void
	{
		var index:Number = ((resumeAtIndexOrLabel==null) ? length : normalizeIndex(resumeAtIndexOrLabel));
		if (index==null) {
			if (OUTPUT_LEVEL>0) FuseKitCommon.error('102','fastForward',String(resumeAtIndexOrLabel));
			return;
		}
		if (index==0 || index<=_nIndex) {
			if (OUTPUT_LEVEL>0) FuseKitCommon.error('104',index);
			skipTo(index);
			return;
		}
		clearInterval(_nDelay);
		//(this[_nIndex]).stop(); // do not cast!
		for (var i:Number=_nIndex; i<index; i++) {
			(this[i]).fastForward(null, _aDefaultTargs, scope); // do not cast!
			advance(false, true, !(i==index-1 && index<length));
		}
	}
	
	// ----------------------------------------------------------------------------------------------------
	//       Private Methods
	// ----------------------------------------------------------------------------------------------------
	
	/**
	 * @return shortform name used in many outputs
	 */
	private function getHandle():String { return '-Fuse'+((label!=undefined)?(' "'+label+'"'):'#'+String(_nID)); }
	
	/**
	* Internal handler called by items on completion.
	* @param wasTriggered 	is sent true when an item advanced prematurely using the trigger property completes and is used to track the 
	* final completion of a Fuse in which animations trail beyond the sequence end.
	* @param silentStop 	starting a 0-item Fuse triggers this param so that only the <code>onComplete</code> event gets fired.
	* @param isFF 			used by fastForward to disable advance-then-play functionality
	*/
	private function advance(wasTriggered:Boolean, silentStop:Boolean, isFF:Boolean):Void
	{
		if (_nState<1) {
			if (Fuse.OUTPUT_LEVEL>1) {
				FuseKitCommon.output("** DEVELOPER ALERT: "+getHandle()+" advance called out of turn! (state:"+state+" currentIndex:"+currentIndex+") Please report this Fuse's details to MosesSupposes.com. **");
			}
			return;
		}
		var isLastFinal:Boolean = false;
		if (_nIndex==length-1 && isFF!=true) {
			for (var i:Number=length-1; i>-1; i--) {
				if (FuseItem(this[i])._nPlaying>-1) {
					return; // an overlapping item (one containing a trigger) is not finished playing.
				}
			}
			isLastFinal = true;
		}
		if (wasTriggered==true && isLastFinal==false) { // wasTriggered calls are sent only for the above check. 
			return;
		}

		if ((this[_nIndex]) instanceof Fuse) {
			Fuse(this[_nIndex]).removeEventListener('onComplete', _oDel1);
		}
		if (_nIndex+1>=length) {
			this.stop(silentStop);
			if (Fuse.OUTPUT_LEVEL>1) FuseKitCommon.output(getHandle()+' complete.');
			_nIndex = length-1; // added so that onComplete event appears to occur during last action if currentIndex is queried
			dispatchEvent({target:this, type:'onComplete'});
			if (autoClear==true || (autoClear!==false && AUTOCLEAR==true)) destroy();
			return;
		}
		else {
			_nIndex++;
		}
		if (isFF==true) return;
		if (Fuse.OUTPUT_LEVEL>1) FuseKitCommon.output(getHandle() + ' advance: '+_nIndex);
		dispatchEvent({target:this, type:'onAdvance'});
		playCurrentItem();
	}
	
	/**
	* Internal helper that triggers <code>startItem()</code> in currently active item.
	* @param postDelay		true is sent when a delay has completed.
	* @param delay		force a delay to play, such as during resume
	*/
	private function playCurrentItem(postDelay:Boolean, resumeDelay:Boolean):Void
	{
		clearInterval(_nDelay);
		if (postDelay!=true || resumeDelay==true) {
			var d:Number = 0;
			if (resumeDelay!=true) { // updated v2.1.2, plus pause & resume methods: improved standalone delay + callback, including trailing tweens overlapping
				d = (FuseItem(this[_nIndex]).evalDelay(scope) || 0) * 1000;
			}
			if (d>0 || resumeDelay==true) {
				if (resumeDelay==true) {
					d = _nTimeCache;
					this._nTimeCache += getTimer();
				} else {
					var multiplier:Number = Math.abs(_global.com.mosesSupposes.fuse.ZigoEngine.TIME_MULTIPLIER);
					if (_global.isNaN(multiplier)==true) multiplier = 1;
					d *= multiplier;
					this._nTimeCache = (getTimer() + d);//used during pause.
				}
				this._nDelay = setInterval(this, 'playCurrentItem', d, true);
				return;
			}
		}
		_nTimeCache = _nDelay = -1;
		if ((this[_nIndex]) instanceof Fuse) {
			if (_oDel1==null) _oDel1 = Delegate.create(this,advance);
			Fuse(this[_nIndex]).addEventListener('onComplete', _oDel1);
			Fuse(this[_nIndex]).start(_aDefaultTargs, scope);
		}
		else {
			var propsTweened:String = (FuseItem(this[_nIndex]).startItem(_aDefaultTargs, scope, duration, easing));
			if (Fuse.OUTPUT_LEVEL>1) FuseKitCommon.output(getHandle()+' props tweened: '+propsTweened);
		}
	}
	
	/**
	* Nested instances receive this event
	* @param event object
	*/
	private function evtSetStart(o:Object):Void
	{
		setStartProps.apply(this, o.filter);
	}
		
	/**
	 * Simple Syntax:Generate a new Fuse and begin intercepting tween calls until {@link com.mosesSupposes.fuse.Fuse#close} is called.
	 * @description	Simple Syntax is an alternative way to construct Fuse sequences. 
	 * Its primary uses are 1. Clear method-call sequencing and 2. An easy way for non-advanced coders to set up sequences.
	 * @usage
	 * <pre>
	 * // Example 1: Can be used to enforce a clear, strict order of timed events
	 * Fuse.open();
	 *  Fuse.addCommand (mainMenu, "draw", menuXML);
	 *  Fuse.addCommand ("delay", .5);
	 *  Fuse.addCommand (contentPage, "loadContent", firstItem);
	 *  Fuse.addCommand (screenDisplay, "exposeLayout");
	 *  Fuse.addCommand ("delay", 2);
	 *  Fuse.addCommand (this, "onResize");
	 *  Fuse.addCommand (Logger, "output", "Setup sequence complete.", 0);
	 * Fuse.close();
	 * 
	 * // Example 2: Simple Syntax with shortcut tweens
	 * Fuse.open();
	 *  box_mc.slideTo(150,150, 1);
	 *  Fuse.openGroup();
	 *   box_mc.scaleTo(250, 1);
	 *   box_mc.brightnessTo(-50, 2);
	 *  Fuse.closeGroup();
	 *  box_mc.colorTo(0x6633FF, 1);
	 * Fuse.closeAndStart();
	 * </pre>
	 * <br>
	 * You may retrieve the Fuse instance created, or reopen an existing Fuse:
	 * <pre>var f:Fuse = Fuse.open(); // store a reference to the Fuse
	 * // later...
	 * Fuse.open(f); // reopen existing
	 * // or...
	 * Fuse.open(0); // open Fuse with id 0
	 * // or...
	 * Fuse.open("introSequence"); // open Fuse with the label "introSequence"</pre>
	 * <br>
	 * If you mostly use simple syntax and don't reuse your Fuses, it's recommended that you set {@link #AUTOCLEAR} to true to avoid memory buffering.
	 * @param fuseOrID	(Optional) Pass an existing Fuse, or its id or label to reopen it.
	 * @return 			The opened Fuse instance that tween calls will be routed to until close() is called.
	 * @see	#openGroup
	 * @see	#closeGroup
	 * @see	#close
	 * @see	#closeAndStart
	 * @see	#startRecent
	 * @see	#addCommand
	 * @see	#id
	 * @see	#label
	 */ 
	public static function open(fuseOrID:Object):Fuse // returns Fuse instance added to until Fuse.close() is called.
	{
		var _ZigoEngine:Object = _global.com.mosesSupposes.fuse.ZigoEngine;
		if (_ZigoEngine==undefined) {
			FuseKitCommon.error('106');
			return null;
		}
		else {
			_ZigoEngine.register(Fuse, FuseItem);
		}
		if (_oBuildMode==null) {
			_oBuildMode = {
				curID:-1,
				prevID:-1,
				curGroup:null
			};
		}
		else if (_oBuildMode!=null && _oBuildMode.curID>-1) {
			close();
		}
		if (fuseOrID!=null) {
			if (fuseOrID instanceof Fuse) {
				_oBuildMode.curID = fuseOrID.id;
			}
			else if (getInstance(fuseOrID)!=null) {
				_oBuildMode.curID = getInstance(fuseOrID).id;
			}
			else {
				FuseKitCommon.error('107');
				return null;
			}
		}
		else {
			_oBuildMode.curID = (new Fuse()).id;
		}
		_oBuildMode.prevID = _oBuildMode.curID;
		return getInstance(_oBuildMode.curID);
	}
	
	/**
	* Simple Syntax: Begins a new animation group of simultaneous actions.
	* @description <code>Fuse.openGroup();</code> can be called in place of <code>Fuse.open();</code>.<br><br>
	* If <code>Fuse.openGroup();</code> is called while a previous group was open, the preceding group is closed automatically.
	* <pre>// use in place of Fuse.open() to begin a new Fuse.
	* Fuse.openGroup();
	*  clip1.tween("_x","100");
	*  clip2.tween("_scale",200);
	* Fuse.openGroup(); // you can skip closeGroup if opening another group.
	*  clip1.tween("_x","-100");
	*  clip2.tween("_scale",100);
	* Fuse.closeAndStart(); // you can skip closeGroup here too.
	* </pre>
	* @param fuseOrID:Fuse		(Optional) an existing Fuse or Fuse's id or label in which to open the new group.
	* @return					The currently open fuse instance or a new Fuse if openGroup was called prior to open().
	* @see	#open
	* @see	#closeGroup
	* @see	#close
	* @see	#closeAndStart
	* @see	#startRecent
	* @see	#addCommand
	* @see	#id
	* @see	#label
	*/
	public static function openGroup(fuseOrID:Object):Fuse
	{
		// allow openGroup() to open a new sequence.
		if (!(_oBuildMode!=null && _oBuildMode.curID>-1)) open(fuseOrID); 
		else if (_oBuildMode.curGroup!=null) closeGroup();
		_oBuildMode.curGroup = new Array();
		return getInstance(_oBuildMode.curID);
	}
	
	/**
	* Simple Syntax: Closes an action group started by {@link #openGroup}.
	* @description	May be omitted if followed by <code>Fuse.close</code> or <code>Fuse.closeAndStart</code>.<br><br>
	* If <code>Fuse.openGroup()</code> is called while a previous group was open, the preceding group is closed automatically and the <code>closeGroup</code> command can be skipped.
	* <pre>Fuse.open();
	* clip1.tween("_x","100");
	* Fuse.openGroup();
	*  clip1.tween("_x","-100");
	*  clip2.tween("_scale",200);
	* Fuse.closeGroup();
	* clip1.scaleTo(0);
	* clip2.scaleTo(0);
	* Fuse.closeAndStart();</pre>
	* @see	#open
	* @see	#openGroup
	* @see	#close
	* @see	#closeAndStart
	* @see	#startRecent
	* @see	#addCommand
	*/
	public static function closeGroup():Void
	{
		if (_oBuildMode.curGroup==null || !(_oBuildMode!=null && _oBuildMode.curID>-1)) return;
		getInstance(_oBuildMode.curID).push(_oBuildMode.curGroup);
		_oBuildMode.curGroup = null;
	}
	
	/**
	* Simple Syntax: Completes the Fuse generated by {@link com.mosesSupposes.fuse.Fuse#open}.
	* @description	It is important that you complete each Fuse created using <code>Fuse.open()</code> using either <code>Fuse.close()</code> or <code>Fuse.closeAndStart()</code>. You cannot call <code>start</code> on a Fuse instance while Fuse is open.
	* <pre>var runSetup:Fuse = Fuse.open();
	* Fuse.addCommand(this, "callbackOne");
	* Fuse.addCommand("delay", .25);
	* Fuse.addCommand(this, "callbackTwo");
	* Fuse.addCommand("delay", .25);
	* Fuse.addCommand(this, "callbackThree");
	* Fuse.close();
	* 
	* // later in program...
	* runSetup.start(); // reference the Fuse created
	* </pre>
	* @see	#open
	* @see	#openGroup
	* @see	#closeGroup
	* @see	#closeAndStart
	* @see	#startRecent
	* @see	#addCommand
	*/
	public static function close():Void
	{
		if (!(_oBuildMode!=null && _oBuildMode.curID>-1)) return;
		if (_oBuildMode.curGroup!=null) closeGroup();
		_oBuildMode.curID = -1;
	}
	
	/**
	* Simple Syntax: Close the open Fuse instance and start it playing.
	* @description <pre>var runSetup:Fuse = Fuse.open();
	* clip1.fadeOut();
	* clip2.fadeOut();
	* clip3.fadeOut();
	* Fuse.closeAndStart();</pre>
	* @param 	setStart	A {@link #setStartProps} call is generated from all arguments before the Fuse begins playing.
	* @see	#open
	* @see	#openGroup
	* @see	#closeGroup
	* @see	#close
	* @see	#startRecent
	* @see	#addCommand
	*/
	public static function closeAndStart(setStart:Object):Void
	{
		if (!(_oBuildMode!=null && _oBuildMode.curID>-1)) return;
		var f:Fuse = getInstance(_oBuildMode.curID);
		close();
		f.start.apply(f, arguments);
	}
	
	/**
	* Simple Syntax: Restarts the Fuse most recently created using Fuse.{@link #open}().
	* @param 	setStart	A {@link #setStartProps} call is generated from all arguments before the Fuse begins playing.
	* @see	#open
	* @see	#openGroup
	* @see	#closeGroup
	* @see	#close
	* @see	#closeAndStart
	* @see	#addCommand
	*/
	public static function startRecent(setStart:Object):Void
	{
		var f:Fuse = getInstance(_oBuildMode.prevID);
		if (f!=null) f.start.apply(f, arguments);
		else FuseKitCommon.error('108');
	}
	
	/**
	* Multi-purpose method for all non-animation Simple Syntax features.
	* @usage <pre>var f:Fuse = new Fuse();
	*  
	* // <b>callback</b>: scope, func, args
	* Fuse.addCommand(this, "setItemData", 0, "Submit", true);
	*  
	* // <b>delay</b>
	* Fuse.addCommand("delay", .5);
	*  
	* // <b>inline Fuse play-command</b>: 
	* // this final action will cause the Fuse to loop
	* Fuse.addCommand("start");
	*  
	* // <b>advance-trigger</b> (should appear within group)
	* Fuse.addCommand("trigger", .5);
	* </pre>
	* @description <p>Some addCommand calls are allowed inside groups (<code>'delay','trigger'</code>, function-calls), 
	* but most are not. For instance if you want to have a Fuse pause itself, place the command 
	* <code>Fuse.addCommand('pause');</code> outside any <code>Fuse.openGroup();</code> blocks.
	* <p>The <code>'trigger'</code> feature should appear within groups and adds powerful flexibility for animators:
	* <p>Just as delays can stagger the start times of grouped tweens, triggers allow the ends of grouped animations 
	* to overlap with the following action by advancing the action early. For example if an action contains two tweens, 
	* the longest of which is 2 seconds plus a 1-second delay, including <code>Fuse.addCommand("trigger", 2.5);</code> 
	* in the group would advance the Fuse to the next action half a second before the running tweens complete. 
	* This adds timeline-like flexibility and helps you keep your sequences less rigid. 
	* 
	* @param commandOrScope		Accepts: <code>'delay','trigger','start','stop','pause','resume','skipTo','setStartProps'</code> or in the case of a function-call a scope such as <code>this</code>.
	* @param indexOrFunc		Varies based on first argument: <code>'delay', 'trigger' </code>: Number of seconds. <code>'skipTo'</code>: Destination index (starting at 0 for the first action). 
	* 							For function-call, a string of the function name such as <code>'trace'</code>.
	* @param argument			Function-call: Any number of arguments can follow and will be passed during the call.
	* @see	#open
	* @see	#openGroup
	* @see	#closeGroup
	* @see	#close
	* @see	#closeAndStart
	* @see	#startRecent
	*/
	public static function addCommand(commandOrScope:Object, indexOrFunc:Object, argument:Object):Void
	{
		if (!(_oBuildMode!=null && _oBuildMode.curID>-1)) return;
		var inGroup:Boolean = (_oBuildMode.curGroup!=null);
		var into:Array = (inGroup==true) ? _oBuildMode.curGroup : getInstance(_oBuildMode.curID); // allow some addCommands within groups
		if (typeof commandOrScope=='string') { // assume it's a command
			var hasArg:Boolean = (indexOrFunc!=undefined);
			var valid:Boolean = FuseKitCommon._validateFuseCommand(String(commandOrScope), inGroup, hasArg, OUTPUT_LEVEL, true);
			if (valid==true) {
				into.push({__buildMode:true, command:commandOrScope, commandargs:indexOrFunc});
			}
		}
		else { 
			// assume it's a function-call
			into.push({__buildMode:true, scope:commandOrScope, func:indexOrFunc, args:arguments.slice(2)});
		}
	}
	
	// -- internal --
	
	/**
	* @exclude
	* Internal use only. This is the method ZigoEngine uses to route tween calls into an open Fuse instance after <code>Fuse.open()</code>.
	* @return		true if Fuse is in build-mode
	*/
	public static function addBuildItem(args:Array):Boolean
	{
		if (!(_oBuildMode!=null && _oBuildMode.curID>-1)) return false;
		var into:Array = (_oBuildMode.curGroup!=null) ? _oBuildMode.curGroup : getInstance(_oBuildMode.curID);
		if (args.length==1 && typeof args[0]=='object') {
			// Object syntax can be mixed with simple syntax by using Fuse.open(); with commands like my_mc.tween({x:'100'});
			into.push(args[0]);
		}
		else {
			into.push({__buildMode:true, tweenargs:args});
		}
		return true;
	}
	
	/**
	* @param indexOrLabel		numerical item index or label string. Pass a negative index to count back from end, like -1 for last item.
	* @return index, or null indicating failure.
	*/
	private function normalizeIndex(indexOrLabel:Object):Number
	{
		var index:Number;
		if (typeof indexOrLabel=='string') { 
			index = -1;
			for (var i:Number=0; i<length; i++) {
				if ((this[i]).label==String(indexOrLabel)) { // do not cast
					index = i;
					break;
				}
			}
			if (index==-1) {
				return null;
			}
		}
		else {
			index = Number(indexOrLabel);
		}
		if (_global.isNaN(index)==true || Math.abs(index)>=length) {
			return null;
		}
		if (index<0) index = Math.max(0, length + index);
		return index;
	}
	
	/**
	* Internal, used to add a Fuse instance to the _aInstances array.
	* @param 	Fuse instance
	* @return 	internal index used as Fuse's id
	*/
	private static function registerInstance(s:Fuse):Number
	{
		if(_aInstances==null) _aInstances = new Array();
		return _aInstances.push(s)-1;
	}
	
	/**
	* Interal, used to remove a Fuse instance from the _aInstances array.
	* @param id
	* @param isDestroyCall
	*/
	private static function removeInstanceAt(id:Number, isDestroyCall:Boolean):Void
	{
		if (isDestroyCall!=true) {
			Fuse(_aInstances[id]).destroy();
		}
		delete _aInstances[id];
	}
}
