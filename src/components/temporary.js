<div className="container">


<div className="ko-box">

	<div className="ko-box-right">
		<h6>kookboeken</h6>

        <div className="keuken ko-box-right__outer content-item work-grid-item inview" keuken-filter="{{ sortedboek.keuken }}">
            <div className="ko-box-right__img">
            <img src="{{ site.baseurl }}/img/all/{{ sortedboek.title | slugify }}_title.jpg" alt=""/>
            </div>
            <div className="ko-box-right__text">
                <p>{{ sortedboek.title }}</p>
                <h2>{{ sortedboek.jaar }}</h2>
                <p>{{ sortedboek.auteur }}</p>
            </div>
        </div>

			<h5>alle kookboeken</h5>
	</div>

	<div className="ko-box-left">
		<div className="kookboeken-box-left">

			<div className="keuken ko-box-left__outer content-item work-grid-item inview" keuken-filter="{{ sortedboek.keuken }}">
					<div className="ko-box-left__top">
						<div className="ko-box-left__img">
                            <figure className="post__image">
                                <img src="{{ site.baseurl }}/img/all/{{ sortedboek.title | slugify }}_title.jpg" alt="{{ sortedboek.title }} - {{ sortedboek.img_url }}" />
                            </figure>
						</div>
					</div>
				<div className="ko-box-left__bottom">
					<p>selectie</p>
					<h4>
						titel
						<span>2000</span>
					</h4>
					<h5>
						auteur
					</h5>
					<h6>
						Uitgever, 2000
					</h6>
					
				</div> 
			</div> 

		</div>
	</div>
</div>
</div>


